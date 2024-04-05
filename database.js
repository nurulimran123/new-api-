import mongoose from "mongoose";

export const connectDB= async (url,db_name)=>{
    try{
        const db_option={
            // dbName: db_name,
            useNewurlparser:true,
            useUnifiedTopology:true,
            // autoindex:true,
            socketTimeoutMS:45000,
            serverSelectionTimeoutMS: 60000,
            family:4                                                                             
        }
        await mongoose.connect(url,db_option);
        console.log("[datebase] : connected successfully to mongodb"); 
    } catch (error) {
        console.log(error);
    }
}
