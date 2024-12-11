import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);  // Access authUser from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate if the user is not logged in

  useEffect(() => {
    // If no authUser is found, navigate to the login page
    if (!authUser) {
      navigate("/login");
    }

    // Reset selectedUser on component unmount
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [authUser, dispatch, navigate]);

  return (
    <>
      {selectedUser ? (
        // If selectedUser exists, show the chat interface
        <div className="md:min-w-[550px] flex flex-col">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={selectedUser?.profilePhoto || "/default-avatar.png"} // Fallback for missing profile photo
                  alt="user-profile"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p className="text-sm font-semibold text-white">
                  {selectedUser?.fullname || "Unknown User"} {/* Fallback for missing full name */}
                </p>
              </div>
            </div>
          </div>

          <Messages />
          <SendInput />
        </div>
      ) : (
        // If selectedUser is null, display logged-in user's info (authUser)
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-2xl text-white">
            Hi, {authUser?.fullname || "Guest"} {/* Fallback for missing authUser */}
          </h1>
          <h1 className="text-2xl text-white font-bold">Let's start a conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
