import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors :{
        origin : ['http://localhost:5173/'],
        methods : ['GET', 'POST'],
    },
    });
    

    export const getReceiverSocketId = (receiverId) => {
        return userSocketMap[receiverId];
    }

const userSocketMap = {
    // userId : socketId
}; 
// {userId-> socketId}

io.on('connection', (socket) => {

    console.log('user connected', socket.id);

    //extracted userId from the socket handshake query
    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id; // Map userId to socketId
        console.log(`User ID ${userId} mapped to socket ID ${socket.id}`);
    }
    // if(userId !== undefined){
    //     userSocketMap[userId] = socket.id;
    // }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    console.log('Online Users:', Object.keys(userSocketMap));


    //handle the socket disconnection
    socket.on('disconnect', ()=>{
        console.log('user disconnected', socket.id);  
        
        //find and remoe the disconnected user from the userSocketMap
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key]; // Remove the user from the map
                console.log(`Removed user ID ${key} on disconnect`);
                break;
            }
        } 

        // delete userSocketMap[userId]; 


        // emit the updated list of online users
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

    })
});

export {app, io, server};