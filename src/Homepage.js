import React, { useState ,useEffect } from 'react';
import {auth } from "./config/firebase";
import 'firebase/auth';
import axios from "axios";

const Homepage = () => {
  const [email, setEmail] = useState('');
  const [username,setUserName]=useState('');
  const [dob, setDob] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [country, setcountry] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });
    return () => unsubscribe();
  }, []);
 
  
  useEffect(() => {
    if(userId.length>0){
      const fetchImages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/Profile/Users/${userId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
         "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
        //  "auth": userId,
        },
        // body: JSON.stringify({ phone, email, dob, gender, location,country,username })
    });
    const json = await response.json()
     console.log(json);
      if(json){
          setEmail(json.email);
          setUserName(json.username);
          const dob=new Date(json.dob).toISOString().split('T')[0];
          setDob(dob);
          setGender(json.gender);
          setLocation(json.location);
          setcountry(json.country);
          setPhone(json.phone);
      }
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchImages();
    }
    
  }, [userId,setUserId]);

  const [image, setimage] = useState(null);

  const handleFileChange = (e) => {
    setimage(e.target.files[0].name);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      // Replace with your backend API endpoint
      await axios.post('http://localhost:5000/api/img/upload', formData);

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
 
  const haandleQr = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/Profile/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId,phone, email, dob, gender, location,country,username,image }),
      });

      const data = await response.json();
      setQrCodeImage(data.qrCodeImage);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    setcountry(e.target.value);
  };

  // List of countries (you can fetch this dynamically if needed)
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    // ... other countries
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/Profile/Users/${userId}`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
       "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      //  "auth": userId,
      },
      body: JSON.stringify({ userId,phone, email, dob, gender, location,country,username,image })
  });
  const json = await response.json()
 console.log(json);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/Profile/Users", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
       "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
       "auth": userId,
      },
      body: JSON.stringify({ userId,phone, email, dob, gender, location,country,username,image })
  });
  const json = await response.json()
 console.log(json);
  };
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  // Calculate the image position based on mouse movement
  const handleMouseMove = (e) => {
      const containerRect = e.target.getBoundingClientRect();
      const xPercent = (e.clientX - containerRect.left) / containerRect.width;
      const yPercent = (e.clientY - containerRect.top) / containerRect.height;
  
      // Adjust the factor as needed (try larger values)
      const newXOffset = (xPercent - 0.5) * 50; // Increased factor
      const newYOffset = (yPercent - 0.5) * 50; // Increased factor
  
      setXOffset(newXOffset);
      setYOffset(newYOffset);
  };
  return (
    <div className='main'>

    <div className='container'>
       <h3>Create the Profile Here</h3>
    <form onSubmit={handleSubmit}>
    <div className="profile" >
        <label>Username</label>
        <input
          type="username"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="profile" >
        <label>Email Address:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="profile" >
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="profile">
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className="profile">
        <label>Gender:</label>
        <div className="profile">
          <input
            type="radio"
            id="male"
            value="male"
            checked={gender === 'male'}
            onChange={handleGenderChange}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="profile">
          <input
            type="radio"
            id="female"
            value="female"
            checked={gender === 'female'}
            onChange={handleGenderChange}
          />
          <label htmlFor="female" id="helll">Female</label>
        </div>
        <div className="profile">
          <input
            type="radio"
            id="other"
            value="other"
            checked={gender === 'other'}
            onChange={handleGenderChange}
          />
          <label htmlFor="other">Other</label>
        </div>
      </div>
      <div className="profile">
        <label>Country:</label>
        <select value={country} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="profile">
        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="profile">
        <label>Add a Profile Photo</label>
      <input type="file" onChange={handleFileChange} />
      <br/>
      <hr/>
        <button style={{width:"12vh"}} onClick={handleSubmit1}>Upload</button>
      </div>
      <div className="profile" style={{margin:12,gap:23}}>
      <button type="submit">Submit</button>
      <button onClick={handleUpdate}>Update</button> </div>
    </form>
    <hr/>
    <div className="profile"> 
       <button onClick={haandleQr}> Generate Qr Code of the profile</button>
    </div>
      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
     
    </div>
    <img src={require("./hello.jpeg")} onMouseMove={handleMouseMove} alt="Image" style={{marginLeft:"52px",transform: `translate(${xOffset}px, ${yOffset}px)`,width:"50vh",height:"50vh",marginTop:"12vh"}} />
    </div>
  )
}

export default Homepage