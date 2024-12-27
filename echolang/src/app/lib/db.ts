import mongoose from "mongoose";

/**
 * 
 * MongoDB setup in NextJS project
 * A function which is serves to connect with the MongoDB database
 * 
 */

export default async function connectDB(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB is connected.");
        });

        connection.on("error", (err) => {
            console.log("MongoDB went error." + err);
            process.exit();
        });
    } catch(err){
        console.log("Something went wrong while connecting to MongoDB." + err);
    }
}