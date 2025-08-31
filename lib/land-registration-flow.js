// Complete land registration flow with privacy preservation
import apiClient from './api';
import { processLandRegistration, createIntegrityHash } from './privacy-processor';

export class LandRegistrationFlow {
  constructor(userRole = 'citizen') {
    this.userRole = userRole;
    this.steps = [];
  }

  // Step 1: Upload private documents to Supabase
  async uploadPrivateDocuments(documents) {
    this.logStep("Uploading private documents to Supabase...");
    
    const uploadedDocs = {};
    
    for (const [docType, docData] of Object.entries(documents)) {
      try {
        const response = await fetch('/api/storage-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bucket: 'land-documents-private',
            path: `${docType}/${Date.now()}-${docType}.pdf`,
            base64: docData.base64,
            contentType: docData.contentType || 'application/pdf'
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${docType}: ${response.statusText}`);
        }

        const result = await response.json();
        uploadedDocs[`${docType}Url`] = result.publicUrl;
        
      } catch (error) {
        this.logStep(`Error uploading ${docType}: ${error.message}`, 'error');
        throw error;
      }
    }

    this.logStep("Private documents uploaded successfully", 'success');
    return uploadedDocs;
  }

  // Step 2: Process and separate data by privacy level
  async separateDataLevels(landData) {
    this.logStep("Separating data by privacy levels...");
    
    const processedData = await processLandRegistration(landData, this.userRole);
    
    this.logStep("Data separated into privacy levels", 'success');
    return processedData;
  }

  // Step 3: Upload public metadata to IPFS
  async uploadPublicMetadataToIPFS(publicMetadata) {
    this.logStep("Uploading public metadata to IPFS...");
    
    try {
      const response = await apiClient.blockchain.uploadToIPFS(publicMetadata);
      
      this.logStep(`IPFS upload successful: ${response.cid}`, 'success');
      return {
        cid: response.cid,
        ipfsUrl: response.ipfsUrl || `ipfs://${response.cid}`
      };
      
    } catch (error) {
      this.logStep(`IPFS upload failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Step 4: Register on blockchain
  async registerOnBlockchain(blockchainData) {
    this.logStep("Registering parcel on blockchain...");
    
    try {
      const response = await apiClient.blockchain.register({
        plotNumber: blockchainData.parcelId.split('|')[0],
        district: blockchainData.parcelId.split('|')[1],
        ownerAddress: blockchainData.ownerAddress,
        publicMetaCid: blockchainData.publicMetaCid,
        privateDataHash: blockchainData.privateDataHash
      });
      
      this.logStep(`Blockchain registration successful: ${response.parcelId}`, 'success');
      return response;
      
    } catch (error) {
      this.logStep(`Blockchain registration failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Step 5: Store private data reference (Admin only)
  async storePrivateDataReference(privateData, parcelId) {
    if (this.userRole !== 'admin' && this.userRole !== 'officer') {
      this.logStep("Skipping private data storage (insufficient permissions)");
      return null;
    }

    this.logStep("Storing private data reference...");
    
    try {
      // Store in your backend database with access controls
      const response = await apiClient.document.register({
        parcelId: parcelId,
        privateData: privateData,
        accessLevel: 'admin-only',
        encrypted: true
      });
      
      this.logStep("Private data reference stored", 'success');
      return response;
      
    } catch (error) {
      this.logStep(`Private data storage failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Complete registration flow
  async registerLand(landData, documents = {}) {
    try {
      this.logStep("Starting land registration process...");
      
      // Step 1: Upload documents to Supabase
      const documentUrls = Object.keys(documents).length > 0 
        ? await this.uploadPrivateDocuments(documents)
        : {};

      // Step 2: Merge document URLs with land data
      const completeData = { ...landData, ...documentUrls };
      
      // Step 3: Separate data by privacy levels
      const { privateData, publicMetadata, blockchainRecord } = await this.separateDataLevels(completeData);
      
      // Step 4: Upload public metadata to IPFS
      const ipfsResult = await this.uploadPublicMetadataToIPFS(publicMetadata);
      
      // Step 5: Update blockchain record with IPFS CID
      blockchainRecord.publicMetaCid = ipfsResult.ipfsUrl;
      
      // Step 6: Register on blockchain
      const blockchainResult = await this.registerOnBlockchain(blockchainRecord);
      
      // Step 7: Store private data reference (if admin)
      const privateDataRef = await this.storePrivateDataReference(
        privateData, 
        blockchainResult.parcelId
      );

      this.logStep("Land registration completed successfully!", 'success');
      
      return {
        success: true,
        parcelId: blockchainResult.parcelId,
        ipfsCid: ipfsResult.cid,
        blockchainTxHash: blockchainResult.transactionHash,
        privateDataStored: !!privateDataRef,
        accessLevel: this.userRole,
        steps: this.steps
      };
      
    } catch (error) {
      this.logStep(`Registration failed: ${error.message}`, 'error');
      return {
        success: false,
        error: error.message,
        steps: this.steps
      };
    }
  }

  // Transfer land ownership
  async transferLand(parcelId, newOwnerAddress, transferDocuments = {}) {
    try {
      this.logStep("Starting land transfer process...");
      
      // Step 1: Verify current ownership on blockchain
      const currentStatus = await apiClient.blockchain.getStatus(parcelId);
      
      // Step 2: Upload transfer documents to Supabase
      const transferDocs = Object.keys(transferDocuments).length > 0 
        ? await this.uploadPrivateDocuments(transferDocuments)
        : {};

      // Step 3: Execute blockchain transfer
      const transferResult = await apiClient.blockchain.transfer({
        parcelId: parcelId,
        newOwnerAddress: newOwnerAddress
      });
      
      this.logStep("Land transfer completed successfully!", 'success');
      
      return {
        success: true,
        parcelId: parcelId,
        newOwner: newOwnerAddress,
        transactionHash: transferResult.transactionHash,
        transferDocuments: transferDocs,
        steps: this.steps
      };
      
    } catch (error) {
      this.logStep(`Transfer failed: ${error.message}`, 'error');
      return {
        success: false,
        error: error.message,
        steps: this.steps
      };
    }
  }

  // Utility method to log steps
  logStep(message, type = 'info') {
    const step = {
      timestamp: new Date().toISOString(),
      message,
      type
    };
    
    this.steps.push(step);
    console.log(`[${type.toUpperCase()}] ${message}`);
  }

  // Get steps for debugging
  getSteps() {
    return this.steps;
  }
}

export default LandRegistrationFlow;