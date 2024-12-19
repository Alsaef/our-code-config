const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust for your React app's URL
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection Setup
const uri = process.env.MONGO_URI;
let db;
const client = new MongoClient(uri);

client.connect()
    .then(() => {
        db = client.db("chatApp");
        console.log("MongoDB connected");
    })
    .catch((err) => console.log("MongoDB connection error:", err));

// Socket.IO handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sendMessage', async (data) => {
        const { userId, username, message } = data;

        // Insert message into MongoDB
        const messageCollection = db.collection('messages');
        const newMessage = { userId, username, message, timestamp: new Date() };
        await messageCollection.insertOne(newMessage);

        // Emit the message back to the user (self)
        socket.emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Routes to Fetch Messages for a Specific User
app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    const messageCollection = db.collection('messages');

    try {
        const userMessages = await messageCollection.find({ userId }).toArray();
        res.json(userMessages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// frontend

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from './socket';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const userId = "user123"; // Replace with actual logged-in user ID

    useEffect(() => {
        // Fetch messages for the specific user from backend
        axios.get(`http://localhost:5000/messages/${userId}`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));

        // Listen for new messages sent by the user
        socket.on('receiveMessage', (newMessage) => {
            if (newMessage.userId === userId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => socket.off('receiveMessage');
    }, []);

    const sendMessage = () => {
        if (username && message) {
            socket.emit('sendMessage', { userId, username, message });
            setMessage('');
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Chat App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Your name"
                    className="border p-2 w-full mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <textarea
                    placeholder="Type your message"
                    className="border p-2 w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 mt-2"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
            <div className="bg-gray-100 p-4 rounded">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.username}: </strong>{msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
