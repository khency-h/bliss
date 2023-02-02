// Dependencies 
const express = require('express');
const mongoose = require('mongoose');

// Initialize the Express App
const app = express();

// Configure Settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Database Connection + Error/Success + Define Callback Functions 
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('An error occurred with MongoDB: ' + err.message));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));

// Mount Middleware

// Tell the app to listen on dedicated port
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
