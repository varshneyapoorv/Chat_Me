import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store => store.user);

  // Handler function to select the user
  const selectedUserHandler = (user) => {
    console.log(user) // Dispatch the selected user
    dispatch(setSelectedUser(user));
  };

 

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)} // Select the user on click
        className={`${
          selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'
        } flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <div className="avatar online">
          <div className="w-12 h-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="user-profile"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-semibold">{user?.fullname}</p>
          </div>
        </div>
      </div>

      <div className="divider my-2 py-0"></div>
    </>
  );
};

export default OtherUser;
