const mongoose= require("mongoose");
// models/UserProfile.js



const userSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
    unique: true,        // works as foriegn key for the user.js file
},
  username: {
    type: String,
    required: true,
    placeholder: 'Enter your full name',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    placeholder: 'Enter your email address',
  },
  phone: {
    type: String,
    required: true,
    // unique: true,
    placeholder: 'Enter your phone number',
  },
  // password: {
  //   type: String,
  //   required: true,
  //   placeholder: 'Enter your password',
  // },
  dob: {
    type: Date,
    required: true,
    placeholder: 'Select your date of birth',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    placeholder: 'Enter your gender',
  },
  country: {
    type: String,
    required: true,
    placeholder: 'Enter your Country',
  },
  location: {
    type: String,
    required: true,
    placeholder: 'Enter your location',
  }, 
  image: {
    type: String,
    // required: true,
    // unique: true,
    placeholder: 'Enter your Image',
  },
  qrCode:{
    type:String,
  }
});

// const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// module.exports = UserProfile;

// const User=mongoose.model("Users",userSchema);
// User.createIndexes();
module.exports=mongoose.model("Users",userSchema);