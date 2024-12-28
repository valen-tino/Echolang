import User from "paket/app/models/User";
import connectDB from "paket/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_JWT = process.env.SECRET_JWT;

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { email, password } = reqBody;

        if(!email || !password){
            return NextResponse.json({ error: "Please fill in all of the required fields!"}, { status: 400 });
        }

        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ error: "User is not found in the system."}, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({ error: "Password is not valid!" }, { status: 400 });
        }

        const token = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email },
            SECRET_JWT!, { expiresIn: "8h" } // Set the expire session up to 8 hours
        );
        const res = NextResponse.json({ message: "Successfully logged in into the system." }, { status: 200 });
        res.cookies.set("token", token, { httpOnly: true, maxAge: 3600 });
        return res;
    } catch(error){
        return NextResponse.json({ error: error || "Internal Server Error!" }, { status: 500 });
    }
}