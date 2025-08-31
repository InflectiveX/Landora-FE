// Privacy-preserving data processing utilities
import crypto from 'crypto';

// Separate private and public data
export function separateDataLevels(landData) {
  const privateData = {
    // Level 1: Admin-only sensitive data
    ownerFullName: landData.ownerName,
    nic: landData.nic,
    phoneNumber: landData.phoneNumber,
    fullAddress: landData.fullAddress,
    email: landData.email,
    deedDocUrl: landData.deedDocumentUrl,
    surveyReportUrl: landData.surveyReportUrl,
    taxRecords: landData.taxRecords,
    mortgageDetails: landData.mortgageDetails,
    personalDocuments: landData.personalDocuments,
    timestamp: new Date().toISOString()
  };

  const publicMetadata = {
    // Level 2: Platform users can see this
    parcelId: landData.parcelId,
    plotNumber: landData.plotNumber,
    district: landData.district,
    province: landData.province,
    landType: landData.landType,
    landUse: landData.landUse,
    area: landData.area,
    coordinates: landData.coordinates,
    registrationDate: landData.registrationDate,
    verificationStatus: landData.verificationStatus || "Pending",
    publicDocuments: landData.publicDocuments || [],
    // Hash reference to private data (for integrity)
    privateDataHash: crypto.createHash('sha256').update(JSON.stringify(privateData)).digest('hex'),
    lastUpdated: new Date().toISOString()
  };

  const blockchainRecord = {
    // Level 3: Public blockchain verification only
    parcelId: generateParcelId(landData.plotNumber, landData.district),
    ownerAddress: landData.ownerWalletAddress,
    publicMetaCid: "", // Will be filled after IPFS upload
    privateDataHash: "0x" + crypto.createHash('sha256').update(JSON.stringify(privateData)).digest('hex'),
    govVerified: false,
    publicVerified: false
  };

  return { privateData, publicMetadata, blockchainRecord };
}

// Generate consistent parcel ID
export function generateParcelId(plotNumber, district) {
  const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${plotNumber}|${district}|GovRef-${randomRef}`;
}

// Create hash for integrity verification
export function createIntegrityHash(data) {
  return "0x" + crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

// Process complete land registration with privacy levels
export async function processLandRegistration(landData, userRole = 'citizen') {
  const { privateData, publicMetadata, blockchainRecord } = separateDataLevels(landData);
  
  const result = {
    privateData: null,
    publicMetadata: null,
    blockchainRecord: null,
    accessLevel: userRole
  };

  // Role-based data exposure
  switch (userRole) {
    case 'admin':
    case 'officer':
      result.privateData = privateData;
      result.publicMetadata = publicMetadata;
      result.blockchainRecord = blockchainRecord;
      break;
      
    case 'citizen':
    case 'user':
      // Citizens only get public metadata and blockchain proof
      result.publicMetadata = publicMetadata;
      result.blockchainRecord = {
        parcelId: blockchainRecord.parcelId,
        ownerAddress: blockchainRecord.ownerAddress,
        govVerified: blockchainRecord.govVerified,
        publicVerified: blockchainRecord.publicVerified
      };
      break;
      
    case 'public':
      // Public users only get blockchain ownership proof
      result.blockchainRecord = {
        parcelId: blockchainRecord.parcelId,
        ownerAddress: blockchainRecord.ownerAddress,
        govVerified: blockchainRecord.govVerified
      };
      break;
  }

  return result;
}

// Verify data integrity across levels
export function verifyDataIntegrity(privateData, publicMetadata, blockchainRecord) {
  const calculatedPrivateHash = createIntegrityHash(privateData);
  const storedPrivateHash = publicMetadata.privateDataHash;
  const blockchainPrivateHash = blockchainRecord.privateDataHash;

  return {
    privateToPublic: calculatedPrivateHash === storedPrivateHash,
    publicToBlockchain: ("0x" + storedPrivateHash) === blockchainPrivateHash,
    overallIntegrity: calculatedPrivateHash === storedPrivateHash && 
                     ("0x" + storedPrivateHash) === blockchainPrivateHash
  };
}