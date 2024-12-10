import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);

  console.log(selectedUser, "user get");

  return (
    <div className="md:min-w-[550px] flex flex-col">
      <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
        <div className="avatar online">
          <div className="w-12 h-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto || "/default-avatar.png"} // Provide fallback image if profilePhoto is missing
              alt="user-profile"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2">
            {/* Ensure the p tag is visible with proper styling */}
            <p className="text-sm font-semibold text-white whitespace-nowrap overflow-ellipsis">
              {selectedUser?.fullname || "Unknown User"}{" "}
              {/* Fallback if fullName is not available */}
            </p>
          </div>
          {/* Adjust the styling for h1 to ensure it is visible */}
        </div>
      </div>

      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
