"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  console.log("Creating user:", user);
  try {
    console.log("Connecting to database for createUser");
    await connectToDatabase();
    console.log("Attempting to create user in database");

    const newUser = await User.create(user);
    console.log("User created successfully:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
    console.error("Error in createUser:", error);
  }
}

// READ
export async function getUserById(userId: string) {
  console.log("Creating user:", userId);
  try {
    console.log("Connecting to database for readingUser");
    await connectToDatabase();
    console.log("Attempting to read user in database",userId);


    const user = await User.findOne({ clerkId: userId });

    if (!user){
      console.log("User not found", userId); 
      throw new Error("User not found");}

      console.log("User read successfully:", user);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in getUserById:", error);
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  console.log("Updating user:", clerkId);
  try {
    console.log("Connecting to database for updating user");
    await connectToDatabase();
    console.log("Attempting to update user in database", clerkId);

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
    if (!updatedUser) {
      console.log("User update failed", clerkId);
      throw new Error("User update failed");
    }

    console.log("User updated successfully:", updatedUser);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error in updateUser:", error);
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  console.log("Deleting user:", clerkId);
  try {
    console.log("Connecting to database for deleting user");
    await connectToDatabase();
    console.log("Attempting to find and delete user in database", clerkId);

    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      console.log("User to delete not found", clerkId);
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    console.log("User deleted successfully:", deletedUser);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  console.log("Updating user credits:", userId);
  try {
    console.log("Connecting to database for updating credits");
    await connectToDatabase();
    console.log("Attempting to update user credits in database", userId);

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    );

    if(!updatedUserCredits) {
      console.log("User credits update failed", userId);
      throw new Error("User credits update failed");
    }

    console.log("User credits updated successfully:", updatedUserCredits);
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    console.error("Error in updateCredits:", error);
    handleError(error);
  }
}