import { NextRequest, NextResponse } from 'next/server';

// Mock property data
const mockProperties = [
  {
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
  },
  // Add more mock properties as needed
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockProperties,
    count: mockProperties.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json();
    
    // Simulate property registration
    const newProperty = {
      id: `PROP${String(mockProperties.length + 1).padStart(3, '0')}`,
      ...propertyData,
      status: 'Pending Verification',
      registrationDate: new Date().toISOString(),
      blockchainHash: '0x' + Math.random().toString(16).substr(2, 40),
      ipfsHash: 'Qm' + Math.random().toString(36).substr(2, 44),
      verified: false,
    };
    
    mockProperties.push(newProperty);
    
    return NextResponse.json({
      success: true,
      message: 'Property registered successfully',
      data: newProperty,
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to register property',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 400 });
  }
}
