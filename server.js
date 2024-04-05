// CRUID

import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./database.js"
import UserModel from "./model.js"
dotenv.config()

const port= process.env.PORT ?? 3000
connectDB(`${process.env.DATABASE_URL}`,"irfan")


const app =express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.post("/signup", async (req, res) => {
    const data= await UserModel.create(req.body)
    await data.save()
    res.status(201).json({message:"User has been created!",result: data})
})

//  {email:"lol",password:"123"}

app.post("/login", async (req, res) => {
    const {email,password}=req.body
    if(!email || !password){
        return res.status(501).json({message: "please provide email and password"})
    }
    const user = await UserModel.findOne({email:email})
    if(!user){
        return res.status(401).json({message: "No account is found this email"})
    }   
    if(user.password!==password){
        return res.status(301).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"login successfully",result: user})
})

app.get("/users",async(req,res)=>{

    const data= await UserModel.find().select("-password -__v")
    res.status(200).json({message:"Users data fetched!",result: data})

})


app.get("/getUserById",async(req,res) =>{
    const {id}=req.body
    const data = await UserModel.findById({_id:id}).select("-password")
    return res.status(200).json({message:"User data successfully fetched",result:data})
})

app.get("/getUserByEmail",async(req,res)=>{
    const {email}=req.body
    const data = await UserModel.findOne({email:email}).select("-password")
    return res.status(200).json({message:"User data successfully fetched",result:data})
})
 
// update method by email

app.put("/update",async(req,res)=>{
    const {email,name}=req.body
    if (!name){
        return res.status(400).json({message:"please provide me name"})
    }
    const user= await UserModel.findOne({email:email})
    if(!user){
        return res.status(404).json({message:"no account founded"})
    }
    const data = await UserModel.updateOne({email:email},{$set:{name:name}},{new:true})
    return res.status(200).json({message:"name update successfully",result:data})

})

// update method by id 

app.put("/updatee",async(req,res)=>{
    const {id,name}= req.body

    if (!name){
        return res.status(400).json({message:"Please provide me name"})
    }
    const user=await UserModel.findOne({_id:id})
    if(!user){
        return res.status(404).json({message:"No Account Founded"})
    }
    const data = await UserModel.updateOne({_id:id},{ $set:{name:name} },{new:true})
    return res.status(201).json({message:"name update successfully",result:data})
})


// delete method by id

app.delete("/delete",async(req,res)=>{
    const {id}= req.body
    if (!id){
        return res.status(404).json({message:"please provided me name"})
    }
    
    const user=await UserModel.findById({_id:id})
    if(!user){
        return res.status(402).json({message:"no account found"})
    }
  
    const data = await UserModel.deleteOne({_id:id})
    return res.status(200).json({message:"delete successfully"})
})

// delete method by name


app.delete("/deletee",async(req,res)=>{
    const {email}= req.body
    if(!email){
        return res.status(404).json({message:"please provide me email "})
    }

    const user=await UserModel.findOne({email:email})
    if(!user){
        return res.status(402).json({message:"No account found"})
    }
    const data = await UserModel.deleteOne({email:email})
    return res.status(200).json({message:"delete succesfully"})
})

app.delete("/updete/delete",(req,res)=>{
    const {id,Oldpassword,Newpassword}= req.res
    if(!Oldpassword||Newpassword)
})


app.listen(port, async ()=>{
    console.log(`server running on ${port}`);
})