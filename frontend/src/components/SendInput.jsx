import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const SendInput = () => {

  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);  

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:1234/api/v1/message/send/${selectedUser?._id}`);
      console.log(res)
      
    } catch (error) {
      console.log(error)
      
    }
    alert(message);
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
