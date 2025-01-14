import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'AVAILABLE' }
});

const User = mongoose.model('user', userSchema);

export default User;
