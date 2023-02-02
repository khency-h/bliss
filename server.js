// dependencies 
const express = require('express');

// initialize the express app
const app = express();

// configure settings
require('dotenv').config();
const PORT = process.env.PORT;

// establish connection to mongodb

// mount middleware

// tell the app to listen on dedicated port
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
