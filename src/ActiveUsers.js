// ActiveUsers.js
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function ActiveUsers() {
  const [activeUsers, setActiveUsers] = useState([]);
  const handleDelete=(e)=>{
    console.log(e);
  }
  const handleChangeStatus=(e)=>{
    console.log(e);
  }

  useEffect(() => {
        
  const fetchData = async () => {
    const info = collection(db, "Users");
    console.log(info);
    try {
      const data = await getDocs(info);
      console.log(data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setActiveUsers(filteredData);
    } catch (err) {
      console.error(err);
    }
     }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Active Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeUsers.map(user => (
            <tr key={user.id}>
              <td>{user.Username}</td>
              <td>{user.date}</td>
              <td><input
             type="checkbox"
             checked={user.status} /></td>
              <td >
                <button className="hello" onClick={() => handleDelete(user.id)}>Delete</button>
                <button className="hello" onClick={() => handleChangeStatus(user.id)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveUsers;
