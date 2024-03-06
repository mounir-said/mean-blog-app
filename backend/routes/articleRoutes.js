const express = require('express');

const router = express.Router();

const multer = require('multer');

const Article = require('../models/articleModel');

__filename = '';
const myStorage = multer.diskStorage({
  destination : './uploads',
  filename: (req, file, redirect) =>{
    let date = Date.now();
    let fl = date + "." + file.mimetype.split('/')[1];
    redirect(null, fl);
    __filename = fl;
  }
});

const upload = multer({storage: myStorage });


router.post('/add', upload.any('image'), (req, res) =>{
  let data = req.body;
  let article = new Article(data);
  article.date = new Date;
  article.image = __filename;
  article.tags = data.tags.split(',');

  article.save()
  .then((saved) =>{
    __filename = '';
    res.status(200).send(saved);

  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

router.get('/getAll',(req, res)=>{
  Article.find({})
  .then((articles) =>{
    res.status(200).send(articles);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

router.get('/getByid/:id',(req, res) =>{

  let id = req.params.id;
  Article.findOne({_id: id})
  .then((articles) =>{
    res.status(200).send(articles);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )

})
router.get('/getByIdAuthor/:id',(req, res) =>{
  let id = req.params.id;
  Article.find({idAuthor: id})
  .then((articles) =>{
    res.status(200).send(articles);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})
router.delete('/delete/:id',(req, res) =>{
  let id = req.params.id;
  Article.findByIdAndDelete({_id: id})
  .then((articles) =>{
    res.status(200).send(articles);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})

router.put('/update/:id',upload.any('image'),(req, res) =>{

  let id = req.params.id;
  let data = req.body;
  if (__filename.length > 0) {
    data.image = __filename;
  }
  
  data.tags = data.tags.split(',');
  Article.findByIdAndUpdate({_id: id}, data)
  .then((articles) =>{
    __filename = " ",
    res.status(200).send(articles);
  })
  .catch(
    err => {
      res.status(400).send(err);
    }
  )
})


module.exports = router;