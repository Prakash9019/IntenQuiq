// routes/User.js

const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const User=require('../user');


// Create a new user profile
router.post('/Users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a specific user profile by ID
router.get('/Users/:id', async (req, res) => {
  try {
    const h = await User.find({userId: req.params.id});
    // console.log(h[0].username);
    if (!h) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.status(200).json(h[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user profile by ID
router.put('/Users/:id', async (req, res) => {
    try {
      const updatedData = req.body; 
      const updatedProfile = await User.findOneAndUpdate(
        {userId: req.params.id},
        { $set: updatedData },
        { new: true } 
      );
      if (!updatedProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a user profile by ID
router.delete('/Users/:id', async (req, res) => {
    try {
      const deletedProfile = await User.findOneAndDelete({userId: req.params.id});
  
      if (!deletedProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }
  
      res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  router.post('/generate-qr', async (req, res) => {
    try {
      const { userId,phone, email, dob, gender, location,country,username,image } = req.body;
      const qrCodeData = `User ID: ${userId}  Phone: ${phone}   Email: ${email}  Date of Birth: ${dob}  Gender: ${gender}  Location: ${location}   Country: ${country} Username: ${username}
      Image: ${image}
      `;
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
  
      // Save user data and QR code URL to MongoDB
      // const newUser = new User({
      //   userId,phone, email, dob, gender, location,country,username,image,
      //   qrCode: qrCodeImage,
      // });
      // await newUser.save();
  
      res.status(200).json({ qrCodeImage });
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  
module.exports = router;
