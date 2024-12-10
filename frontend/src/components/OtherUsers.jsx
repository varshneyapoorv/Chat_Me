import React from 'react'
import OtherUser
from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import { useSelector } from 'react-redux';

const OtherUsers = (props) => {
const user = props.user
  useGetOtherUsers();
  const {otherUsers} = useSelector(store=>store.user)
  if(!otherUsers) return;  //early return here
  <h1>Loading...</h1>

  return (
    <div className='overflow-auto flex-1'>
      
      {
      otherUsers?.map((user)=>{
        return (
          <OtherUser key={user._id} user={user} />

        )
      })
    }
    
     
    </div>
  )
}

export default OtherUsers
