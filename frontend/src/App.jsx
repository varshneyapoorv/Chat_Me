import React, { useEffect, useState } from 'react'
import './App.css'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'

const router = createBrowserRouter([
  {
    path : "/",
    element : <HomePage />
  },
  {
    path : "/register",
    element : <Signup />
  },
  {
    path : "/login",
    element : <Login />
  }
])

function app (){

  const [socket, setsocket] = useState(null);
  const {authUser, onlineUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  useEffect(()=>{

    let socket = null;

    if(authUser){
      socket = io('http://localhost:1234/',{
        query:{
          userId:authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
        console.log('online users received', onlineUsers);
      });
      return () => socket.close();

    }else{
      if(socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }

    // return ()=>{
    //   if(socket){
    //     socket.disconnect();
    //   }
    // }
  }, [authUser])
}


const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
