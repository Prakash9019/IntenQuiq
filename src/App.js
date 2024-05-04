// import { useEffect, useState } from "react";
// import "./App.css";
// import { Auth } from "./components/auth";
// import { db, auth, storage } from "./config/firebase";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import { ref, uploadBytes } from "firebase/storage";

// function App() {
//   const [movieList, setMovieList] = useState([]);
//   const url=`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=fa2fd60c4d5e235a9ae25b09e7a8eae1`
// //fa2fd60c4d5e235a9ae25b09e7a8eae1
//   // New Movie States
//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");
//   const [status, setStatus] = useState(false);

//   // Update Title State
//   const [updatedTitle, setUpdatedTitle] = useState("");

//   // File Upload State
//   const [fileUpload, setFileUpload] = useState(null);

//   const moviesCollectionRef = collection(db, "Users");

//   const getMovieList = async () => {
//     try {
//       const data = await getDocs(moviesCollectionRef);
//       const filteredData = data.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setMovieList(filteredData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getMovieList();
//   }, []);

//   const onSubmitMovie = async () => {
//     try {
//       await addDoc(moviesCollectionRef, {
//         name: setName,
//         date: setDate,
//         status: setStatus,
//         userId: auth?.currentUser?.uid,
//       });
//       getMovieList();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteMovie = async (id) => {
//     const movieDoc = doc(db, "Users", id);
//     await deleteDoc(movieDoc);
//   };

//   const updateMovieTitle = async (id) => {
//     const movieDoc = doc(db, "Users", id);
//     await updateDoc(movieDoc, { title: updatedTitle });
//   };

//   const uploadFile = async () => {
//     if (!fileUpload) return;
//     const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
//     try {
//       await uploadBytes(filesFolderRef, fileUpload);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="App">
//       <Auth />

//       <div>
//         <input
//           placeholder="UserName..."
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="added date..."
//           type="number"
//           onChange={(e) => setDate(Number(e.target.value))}
//         />
//         <input
//           type="checkbox"
//           checked={isNewMovieOscar}
//           onChange={(e) => setStatus(e.target.checked)}
//         />
//         <label> Received an Oscar</label>
//         <button onClick={onSubmitMovie}> Submit Movie</button>
//       </div>
//       <div>
//         {movieList.map((movie) => (
//           <div>
//             <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
//               {movie.title}
//             </h1>
//             <p> Date: {movie.releaseDate} </p>

//             <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

//             <input
//               placeholder="new title..."
//               onChange={(e) => setUpdatedTitle(e.target.value)}
//             />
//             <button onClick={() => updateMovieTitle(movie.id)}>
//               {" "}
//               Update Title
//             </button>
//           </div>
//         ))}
//       </div>

//       <div>
//         <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
//         <button onClick={uploadFile}> Upload File </button>
//       </div>
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import Homepage from './Homepage';
import SignUp from './SignUp.js';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/homepage" element={<Homepage/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
