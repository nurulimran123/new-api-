import mongoose from  "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase  :true,
        required: [true, 'please provide an email']
    },  // email must be 
    password:{
        type : String   ,
        required: [true, 'plese provide a password']
   }
},
{timestamps:true,}
);
const UserModel = mongoose.model("User",userSchema);
export default UserModel;   