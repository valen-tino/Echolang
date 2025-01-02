import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/schemas/userSchema';
import validator from 'validator';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const reqBody = await req.json();
    const { email, password, name } = reqBody;

    // Validate input fields
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Please fill in all of the required fields.' }, { status: 400 });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Email is not valid. Please try it again.' }, { status: 400 });
    }

    // Check if the user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return NextResponse.json({ error: 'This email has already been used.' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({ message: "Successfully registered the account.", success: true, savedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
