import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import UserApiLimit from "./database/models/userApiLimitSchema"; // Adjust the import path as needed
import { auth } from "@clerk/nextjs";
import { MAX_FREE_ACCOUNT } from "@/constants";

export const increaseAPILimit = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    await mongoose.connect(process.env.MONGODB_URL!);

    const userApiLimit = await UserApiLimit.findOne({ userId });

    if (userApiLimit) {
      userApiLimit.count += 1;
      await userApiLimit.save();
    } else {
      const newUserApiLimit = new UserApiLimit({ userId, count: 1 });
      await newUserApiLimit.save();
    }
  } catch (err) {
    console.error("Error in increaseAPILimit:", err);
    throw new Error('Internal Server Error');
  } finally {
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
  }
};

export const checkLimit = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return false;
    }

    await mongoose.connect(process.env.MONGODB_URL!);

    const userApiLimit = await UserApiLimit.findOne({ userId });

    return !userApiLimit || userApiLimit.count < MAX_FREE_ACCOUNT;
  } catch (err) {
    console.error("Error in checkLimit:", err);
    return false;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
  }
};

export const getAPILimitCount=async()=>{
    const { userId } = auth();

    if (!userId) {
      return 0
    }
    const userApiLimit = await UserApiLimit.findOne({ userId });
    
    if(!userApiLimit){return 0}

    return userApiLimit.count
}