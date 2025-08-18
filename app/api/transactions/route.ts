import { NextRequest, NextResponse } from 'next/server';

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    transactionHash: '0x1234567890abcdef1234567890abcdef12345678901234567890abcdef123456',
    type: 'Property Registration',
    propertyId: 'PROP001',
    propertyTitle: 'Residential Land - Colombo',
    from: '0x1234...5678',
    to: '0xabcd...efgh',
    amount: '0.05 ETH',
    timestamp: '2024-02-15T10:30:00Z',
    status: 'Confirmed',
    blockNumber: 18756432,
    gasUsed: 234567,
    gasPrice: '20 Gwei',
    confirmations: 125,
  },
  // Add more mock transactions as needed
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockTransactions,
    count: mockTransactions.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const transactionData = await request.json();
    
    // Simulate transaction creation
    const newTransaction = {
      id: mockTransactions.length + 1,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
      timestamp: new Date().toISOString(),
      status: 'Pending',
      blockNumber: 18756432 + mockTransactions.length,
      confirmations: 0,
      ...transactionData,
    };
    
    mockTransactions.push(newTransaction);
    
    return NextResponse.json({
      success: true,
      message: 'Transaction created successfully',
      data: newTransaction,
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create transaction',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 400 });
  }
}
