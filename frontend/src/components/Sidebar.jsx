import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogoutUser, setOtherUsers } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';



const Sidebar = () => {

  const [search, setSearch] = useState('');
  const{otherUsers} = useSelector(store=>store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutHandler = async() => {
    try {
      const res = await axios.get(`http://localhost:1234/api/v1/user/logout`);

      dispatch(setLogoutUser());
      dispatch(setMessages(null));
      
      navigate('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    // console.log("Search term:", search);
    // console.log("Other users:", otherUsers);
    
    // Use find method to get the user
    const conversationUser = otherUsers?.find((user) => 
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(conversationUser)
    // console.log("Other users:", otherUsers);

  
    if (conversationUser) {
      // Dispatch only if user is found
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error('User not found');
    }
  };
  

  return (
    <>
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form action="" onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input 
        value = {search}
        onChange={(e)=>setSearch(e.target.value)}
        type="text" className='input input-bordered rounded-md' placeholder='Search...' />
        <button type='submit' className='btn bg-zinc-500 text-white'>
        <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className=' divider px-3'>
      </div>
      <OtherUsers/>

        <div className='mt-2'>
            <button onClick={logoutHandler}className='btn btn-sm'>
                Logout
            </button>
        </div>
    </div>
    </>
  )
}

export default Sidebar
