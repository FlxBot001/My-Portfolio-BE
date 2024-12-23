import { mongooseConnect } from '@/lib/mongoose';
import Profile from '@/models/Profile';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, otp, newPassword } = req.body;

  // Validate input
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user exists
    const user = await Profile.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if the OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Update the user's password
    user.password = newPassword;
    user.otp = undefined; // Clear the OTP
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}