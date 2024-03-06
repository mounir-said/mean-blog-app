const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
require('./config/connect')
const app = express();
const articleRoutes = require('./routes/articleRoutes');
const authorRoutes = require('./routes/authorRoutes');

// Middleware Connections
app.use(cors())
app.use(express.json())
app.use('/articles', articleRoutes);
app.use('/authors', authorRoutes);
app.use('/getImage', express.static('./uploads'));

// Routes


// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})