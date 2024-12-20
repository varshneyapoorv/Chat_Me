import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';



const SendInput = () => {

  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);  
  const {messages} = useSelector(store=>store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty message

    try {
      const res = await axios.post(`http://localhost:1234/api/v1/message/send/${selectedUser?._id}`, {message}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(res)

      const newMessage = res?.data?.newMessage;

      // Log the new message for debugging
      console.log("New message sent:", newMessage);

      // Dispatch the new message to Redux
      dispatch(setMessages([...messages, newMessage]));
      // dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
  }
  return (
    <>
    <form className='px-4 my-3' onSubmit={onSubmitHandler}>
      <div className='w-full relative'>
        <input type="text" 
        value ={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder='Send a message...' 
        className='border text-sm rounded-lg block w-full  p-3 border-zinc-500 bg-gray-600 text-white'/>
        <button type="submit" className='absolute flex inset-y-0 end-0 pr-4 items-center'>
        <IoSend />
        </button>
      </div>
      </form>
    </>
  )
}

export default SendInput


