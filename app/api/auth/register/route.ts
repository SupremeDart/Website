import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
      image: null,
      createdAt: new Date(),
    });
    
    return NextResponse.json(
      { 
        success: true, 
        userId: result.insertedId.toString() 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}