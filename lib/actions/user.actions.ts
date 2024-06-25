"use server" 

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export async function createUser(user:CreateUserParams){
    try{
        await connectToDatabase()
        const newUser=await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    }catch(err){
        handleError(err)
    }
}

export async function updateUser(clerkId:string,user:UpdateUserParams){
    try{
        await connectToDatabase()
        const updatedUser=await User.findOneAndUpdate({clerkId},user,{new:true})
        if(!updatedUser) throw new Error("User not found!")
            return JSON.parse(JSON.stringify(updateUser))
    }catch(err){
        handleError(err)
    }
}

export async function deleteUser(clerkId:string){
    try{
        await connectToDatabase()
        const delUser=await User.findOne({clerkId})
        if(!delUser){
            throw new Error("User not found")
        }
        const deletedUser=await User.findByIdAndDelete(delUser._id)
        revalidatePath("/")

        return deletedUser? JSON.parse(JSON.stringify(deletedUser)):null
    }catch(err){
        handleError(err)
    }
}

export async function updateUserCredits(userId:string,creditFee:number){
    try {
        await connectToDatabase();
    
        const updatedUserCredits = await User.findOneAndUpdate(
          { _id: userId },
          { $inc: { creditBalance: creditFee }},
          { new: true }
        )
    
        if(!updatedUserCredits) throw new Error("User credits update failed");
    
        return JSON.parse(JSON.stringify(updatedUserCredits));
      } catch (error) {
        handleError(error);
      }
}