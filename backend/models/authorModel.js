const mongoose = require ('mongoose');

const Author = mongoose.model('Author',{
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  email:{
    type: String,
    unique: true
  },
  password:{
    type:String
  },
  about:{
    type:String
  },
  image:{
    type:String
  }
} );

module.exports = Author;