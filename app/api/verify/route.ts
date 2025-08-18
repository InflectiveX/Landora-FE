import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, type = 'propertyId' } = await request.json();
    
    if (!query) {
      return NextResponse.json({
        success: false,
        message: 'Search query is required',
      }, { status: 400 });
    }
    
    // Mock verification data
    const verificationResult = {
      id: 'PROP001',
      title: 'Residential Land - Colombo',
      propertyType: 'Residential Land',
      address: '123 Main Street, Colombo 07',
      city: 'Colombo',
      district: 'Colombo',
      province: 'Western Province',
      landArea: '2500',
      landUnit: 'sq_ft',
      owner: 'John Doe',
      ownerNIC: '199012345678V',
      status: 'Verified',
      registrationDate: '2024-01-15',
      blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
      ipfsHash: 'QmP7hdxcMBfLsNQzBVXF4iLbgj9hrhsJ5VfD2DQK9BtRr5',
      documents: 3,
      verified: true,
      verificationDetails: {
        verifiedBy: 'Land Registry Authority',
        verificationDate: '2024-01-20',
        verificationScore: 95,
        documentsVerified: ['Title Deed', 'Survey Plan', 'Identity Document'],
        blockchainConfirmations: 1245,
        lastUpdated: '2024-02-10',
      },
      transferHistory: [
        {
          date: '2024-01-15',
          from: 'Government Registry',
          to: 'John Doe',
          type: 'Initial Registration',
          txHash: '0x1234567890abcdef1234567890abcdef12345678'
        }
      ]
    };
    
    // Simulate search based on query
    if (query === 'PROP001' || query === '0x1234567890abcdef1234567890abcdef12345678') {
      return NextResponse.json({
        success: true,
        message: 'Property found and verified',
        data: verificationResult,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Property not found in registry',
        data: null,
      }, { status: 404 });
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Verification failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
