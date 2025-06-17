import mongoose from "mongoose";


const connectDB=async ()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected at", conn.connection.host);
    }catch(error){
        console.log("Mongo DB Connection Error",error);
        process.exit(1);
    }
}


export default connectDB;
