import express from "express";
import {Server } from "socket.io";
import cors from "cors";
import http from "http";


const app =express();
const server = http.createServer(app);
const io= new Server(server,{
    cors:{
        origin: "*",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("connection is established");

    socket.on("join", (data)=>{
        socket.username = data;
    })
    socket.on("new_message",(message)=>{
        let userMessage= {
            username: socket.username, 
            message: message
        }
        socket.broadcast.emit("broadcast_message",userMessage);
    });
    socket.on("disconnect",()=>{
        console.log("connection is disconnected");
    })
});

server.listen(3000, ()=>{
    console.log("app is listening on 3000");
});