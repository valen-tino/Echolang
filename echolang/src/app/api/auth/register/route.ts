import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'paket/lib/db';
import User from 'paket/app/models/User';
import validator from "validator";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { fullName, email, password, confirmPassword } = reqBody;

        if(!fullName || !email || !password || !confirmPassword){
            return NextResponse.json({ error: "Please fill in all of the required fields." }, { status: 400 });
        }

        if(!validator.isEmail(email)){
            return NextResponse.json({ error: "Email is not valid." }, { status: 400 });
        }

        const isUserAvailable = await User.findOne({ email });
        if(isUserAvailable){
            return NextResponse.json({ error: "User is already exists in the system." }, { status: 400 });
        }

        if(password !== confirmPassword){
            return NextResponse.json({ error: "Password and confirmation password does not match." }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return NextResponse.json({ message: 'Successfully created a new user.', success: true, savedUser });
    } catch(err){
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
    }
}