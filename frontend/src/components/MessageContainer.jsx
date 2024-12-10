import React, { use } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {

  const { selectedUser } = useSelector(store => store.user);

  console.log(selectedUser, "user get")
  return (
    <div className="md:min-w-[550px] flex flex-col ">
        <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full">
              <img
                src={selectedUser?.profilePhoto}
                alt="user-profile"
              />
              {/* <p className="text-white">{selectedUser?.username}</p> */}
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center gap-2">
              <p className="text-sm font-semibold text-white">{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>

        
        <Messages/>
      <SendInput/>
    </div>
  );
};

export default MessageContainer;
