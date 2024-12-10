import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser) return; // Early return if no user is selected

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        // Make sure the selectedUser ID is valid
        const res = await axios.get(`http://localhost:1234/api/v1/message/${selectedUser._id}`);
        console.log(res); // Check the response
        dispatch(setMessages(res.data)); // Dispatch the messages to the store
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]); // Add dispatch to dependencies to avoid stale closures

};

export default useGetMessages;
