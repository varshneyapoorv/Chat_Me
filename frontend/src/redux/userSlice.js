import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : "user",
    initialState : {
        authUser: JSON.parse(localStorage.getItem("authUser")) || null,  // Load from localStorage if available
        otherUsers : null,
        selectedUser : null
    },  
    reducers : {
        setAuthUser : (state, action)=>{
            state.authUser = action.payload;
            localStorage.setItem("authUser", JSON.stringify(action.payload)); // Save to localStorage

            
        },
        setOtherUsers : (state,action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser : (state,action)=>{
            state.selectedUser = action.payload;
        },
        setLogoutUser: (state) => {
            state.authUser = null;
            state.selectedUser = null;
            state.otherUsers = null;
            localStorage.removeItem("authUser"); // Remove from localStorage on logout
          },
    }
});

export const {setAuthUser, setOtherUsers, setSelectedUser, setLogoutUser} = userSlice.actions;

export default userSlice.reducer;