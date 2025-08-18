import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required',
      }, { status: 400 });
    }
    
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: 'Passwords do not match',
      }, { status: 400 });
    }
    
    // Mock registration - replace with actual registration logic
    const user = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      role: 'citizen',
      verified: false,
      registrationDate: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: { user },
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
