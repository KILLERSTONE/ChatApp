import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  message: String,
  processedMessage: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Messages', messageSchema);

export default Message;
