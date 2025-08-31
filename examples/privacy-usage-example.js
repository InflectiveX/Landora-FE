// Example usage of the privacy-preserving land registration system

import LandRegistrationFlow from '../lib/land-registration-flow';

// Example: Complete Land Registration with Privacy Controls
export async function exampleLandRegistration() {
  // Initialize with user role (affects data access)
  const registrationFlow = new LandRegistrationFlow('admin'); // or 'officer', 'citizen', 'public'

  // Sample land data
  const landData = {
    // Basic land information
    plotNumber: "1001",
    district: "Colombo",
    province: "Western",
    landType: "Residential",
    landUse: "Single Family Home", 
    area: "15 Perches",
    coordinates: { lat: 6.9271, lng: 79.8612 },
    
    // Owner information (PRIVATE - only admin sees)
    ownerName: "Nimal Perera",
    nic: "200112345V",
    phoneNumber: "+94771234567",
    email: "nimal.perera@email.com",
    fullAddress: "No 123, Temple Road, Colombo 8",
    
    // Blockchain info
    ownerWalletAddress: "0x298f49B3958E62B35fa37558194857a299365a4C",
    
    // Status
    registrationDate: new Date().toISOString(),
    verificationStatus: "Pending"
  };

  // Sample documents (will be stored in Supabase)
  const documents = {
    deed: {
      base64: "JVBERi0xLjQKJeLjz9MKNg...", // Base64 encoded PDF
      contentType: "application/pdf"
    },
    survey: {
      base64: "JVBERi0xLjQKJeLjz9MKNg...", // Base64 encoded PDF  
      contentType: "application/pdf"
    },
    certificate: {
      base64: "JVBERi0xLjQKJeLjz9MKNg...", // Base64 encoded PDF
      contentType: "application/pdf"
    }
  };

  // Execute complete registration flow
  const result = await registrationFlow.registerLand(landData, documents);

  if (result.success) {
    console.log("✅ Registration successful!");
    console.log("Parcel ID:", result.parcelId);
    console.log("IPFS CID:", result.ipfsCid);
    console.log("Blockchain TX:", result.blockchainTxHash);
    console.log("Private data stored:", result.privateDataStored);
  } else {
    console.error("❌ Registration failed:", result.error);
  }

  return result;
}

// Example: Land Transfer
export async function exampleLandTransfer() {
  const transferFlow = new LandRegistrationFlow('admin');

  const result = await transferFlow.transferLand(
    "1001|Colombo|GovRef-ABC123", // parcel ID
    "0x742d35Cc6653C014678b5C4B8D2b67D6d0E31Ed2", // new owner address
    {
      // Transfer documents
      transferDeed: {
        base64: "JVBERi0xLjQKJeLjz9MKNg...",
        contentType: "application/pdf"
      }
    }
  );

  return result;
}

// Example: Role-based Data Access
export async function exampleDataAccess(parcelId) {
  // Different users see different levels of data
  
  // Public user (anyone)
  const publicFlow = new LandRegistrationFlow('public');
  const publicData = await publicFlow.getParcelInfo(parcelId);
  console.log("Public sees:", {
    owner: publicData.ownerAddress,
    verified: publicData.govVerified
  });

  // Platform user (logged in)
  const citizenFlow = new LandRegistrationFlow('citizen');
  const citizenData = await citizenFlow.getParcelInfo(parcelId);
  console.log("Citizens see:", {
    ...publicData,
    district: citizenData.district,
    landType: citizenData.landType,
    area: citizenData.area
  });

  // Admin user (full access)
  const adminFlow = new LandRegistrationFlow('admin');
  const adminData = await adminFlow.getParcelInfo(parcelId);
  console.log("Admins see:", {
    ...citizenData,
    ownerName: adminData.ownerFullName,
    nic: adminData.nic,
    phoneNumber: adminData.phoneNumber,
    documents: adminData.privateDocuments
  });
}

// Example: Usage in React Component
export function LandRegistrationComponent() {
  const [registrationResult, setRegistrationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (formData, files) => {
    setLoading(true);
    
    // Get user role from context/auth
    const userRole = getUserRole(); // 'admin', 'officer', 'citizen'
    
    const flow = new LandRegistrationFlow(userRole);
    const result = await flow.registerLand(formData, files);
    
    setRegistrationResult(result);
    setLoading(false);

    if (result.success) {
      // Show success message with appropriate details based on role
      showSuccessMessage(result, userRole);
    } else {
      showErrorMessage(result.error);
    }
  };

  return (
    <div>
      {/* Your form components */}
      <LandRegistrationForm onSubmit={handleRegistration} />
      
      {loading && <div>Processing registration...</div>}
      
      {registrationResult && (
        <RegistrationResult 
          result={registrationResult}
          userRole={getUserRole()}
        />
      )}
    </div>
  );
}

export default {
  exampleLandRegistration,
  exampleLandTransfer, 
  exampleDataAccess,
  LandRegistrationComponent
};