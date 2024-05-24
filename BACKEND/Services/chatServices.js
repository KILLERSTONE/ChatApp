import Message from "../Models/Message.js";
import mongoose from "mongoose";

async function saveMessage(userId, message, processedMessage) {
  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ObjectId');
    }

    const newMessage = new Message({ user: userId, message, processedMessage });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    // Handle the error gracefully
    console.error('Error saving message:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


async function getMessage(userId) {
  const messages = await Message.find({ user: userId });
  return messages;
}


export { saveMessage, getMessage };
