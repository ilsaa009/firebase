'use client'
import {get, ref, push, update, remove} from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { database } from '../firebase/config';

const CRUD = () => {
    const [users, setUsers] = useState([]);
    const [Id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    useEffect(() => {
        const usersRef = ref(database, 'users');
        get(usersRef).then((snapshot) => {
          if (snapshot.exists()) { 
            const usersArray = Object.entries(snapshot.val()).map(([Id, data]) => ({
              Id, ...data,
            }));
            setUsers(usersArray);
          } else {
            console.log("Not Available");
          }
        }).catch((error) => {
          console.error(error);
        })
      }, []);

      const handleSubmit = () => {
        if (!title || !subtitle) {
          alert("Fill all the fields");
          return;
        }
        const usersRef = ref(database, 'users');
        if(Id){
          const userRef = ref(database, `users/${Id}`);
          update(userRef, {title, subtitle}).then(() => {
            setUsers((prev) => prev.map((user) => user.id === Id ? {...user, title, subtitle } : user));
            setId(null);
            setTitle('');
            setSubtitle('');
          }).catch((error) => console.error('Error updating user', error));
        }
        else{ 
          push(usersRef, {title,subtitle}).then((newUserRef) => {
            const id = newUserRef.key;
            setUsers((prev) => [...prev, {id, title, subtitle}]);
            setTitle('');
            setSubtitle('');
          }).catch((error) => console.error("Error adding user", error));
        }
      }
    
      const handleDelete = (id) => {
        const userRef = ref(database, `users/${id}`);
        remove(userRef).then(() => {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        }).catch((error) => console.error("Error deleting", error));
      }

      const handleEdit = (id) => {
        const user = users.find((user) => user.id == id);
        if(user) {
          setId(id);
          setTitle(user.title);
          setSubtitle(user.subtitle)
        }
      }
    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-6xl p-8 space-y-6 bg-white shadow-md rounded-md flex flex-col sm:flex-row gap-8">
    <div className="w-full sm:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">CRUD</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              <input 
                type="text" 
                placeholder="Subtitle" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              /> 
        <button className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
        {Id ? 'Update' : 'Add'}
        </button>
        {Id && (
            <button
              className="bg-gray-500 text-white p-2 rounded ml-2"
              onClick={() => {
                setId(null);
                setTitle('');
                setSubtitle('');
              }}
            >
              Cancel
            </button>
          )}
        </form>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Users List</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl text-gray-900">{user.title}</h2>
              <p className="text-gray-600">{user.subtitle}</p>
        
              <div className="flex mt-2">
                <button
                  className="bg-green-500 text-white p-2 rounded mr-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  </div>
  </div>
  )
}

export default CRUD
