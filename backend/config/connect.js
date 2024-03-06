const mongoose = require('mongoose');
require('dotenv')
// Mongo DB Connections
mongoose.connect('mongodb://localhost:27017/meanblog')
.then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});
