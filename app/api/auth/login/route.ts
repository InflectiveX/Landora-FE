import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Mock authentication - replace with actual auth logic
    if (email && password) {
      const user = {
        id: 1,
        email: email,
        role: email.includes('admin') ? 'admin' : 'citizen',
        name: email.includes('admin') ? 'Admin User' : 'Demo User',
        verified: true,
      };
      
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        data: {
          user,
          token: 'mock-jwt-token-' + Math.random().toString(36),
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      }, { status: 401 });
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
