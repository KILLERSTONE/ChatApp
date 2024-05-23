import bcrypt from 'bcrypt';
import User from '../Models/Users.js';

async function registerUser(username, password) {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  console.log(`User '${username}' registered successfully`);

  return newUser;
}

async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }
  console.log(`User '${username}' logged in`);

  return user;
}

export { registerUser, loginUser };
