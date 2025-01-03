import mongoose from 'mongoose';

export default async function connectDB(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB is connected.");
        });

        connection.on("error", (err) => {
            console.log("Something went wrong." + err);
            process.exit();
        });
    } catch(err){
        console.log("Something went wrong while connecting to the MongoDB." + err);
    }
}