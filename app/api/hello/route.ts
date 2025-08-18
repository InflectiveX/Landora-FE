import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the Land Registry API!',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Data received successfully',
    data: body,
    timestamp: new Date().toISOString(),
  });
}
