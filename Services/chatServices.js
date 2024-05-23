import Message from "../Models/Message.js";

async function saveMessage(user, message, processedMessage) {
  const newMessage = new Message({ user, message, processedMessage });
  await newMessage.save();
  return newMessage;
}

export default { saveMessage };
