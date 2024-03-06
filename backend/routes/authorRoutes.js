const express = require('express');
const bcrypt = require('bcrypt'); // Corrected typo
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const Author = require('../models/authorModel');

 __filename = ''; // Declared __filename as a local variable

const myStorage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split('/')[1];
    redirect(null, fl);
    __filename = fl;
  }
});

const upload = multer({ storage: myStorage });

router.post('/register', upload.any('image'), (req, res) => {
  let data = req.body;
  let author = new Author(data);
  author.date = new Date();
  author.image = __filename;
  let salt = bcrypt.genSaltSync(10); // Added 'let' before salt
  author.password = bcrypt.hashSync(data.password, salt);

  author.save()
    .then((saved) => {
      __filename = '';
      res.status(200).send(saved);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/login', (req, res) => {
  let data = req.body;
  Author.findOne({ email: data.email })
    .then((author) => {
      if (!author) {
        res.status(400).send('User not found');
      } else {
        let valid = bcrypt.compareSync(data.password, author.password); // Compare password with hashed password
        if (!valid) {
          res.status(400).send('Email or password invalid');
        } else {
          let payload = {
            _id: author._id,
            email: author.email,
            fullName: author.firstName + " " + author.lastName
          };
          let token = jwt.sign(payload, '123456789');
          res.status(200).send({ myToken: token });
        }
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
});



router.get('/getAllAuthors',(req, res)=>{
  Author.find({})
  .then((author) =>{
    res.status(200).send(author);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

router.get('/getAuthorByid/:id',(req, res) =>{

  let id = req.params.id;
  Author.findOne({_id: id})
  .then((author) =>{
    res.status(200).send(author);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )

})

router.delete('/deleteAuthor/:id',(req, res) =>{
  let id = req.params.id;
  Author.findByIdAndDelete({_id: id})
  .then((author) =>{
    res.status(200).send(author);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

router.put('/updateAuthor/:id',upload.any('image'),(req, res) =>{

  let id = req.params.id;
  let data = req.body;
  if (__filename.length > 0) {
    data.image = __filename;
  }
  
  Author.findByIdAndUpdate({_id: id}, data)
  .then((author) =>{
    __filename = " ",
    res.status(200).send(author);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

module.exports = router;
