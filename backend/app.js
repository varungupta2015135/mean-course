const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://varun:q0NI5hYxtETODhD6@cluster0-mudzy.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log("Connected Successfully!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
    // const posts = [
    //     {id: 'n1j3123b1jknb', title: 'First server-side post', content: 'Hope this works!!'},
    //     {id: 'n1j31fdb1jknb', title: 'Second server-side post', content: 'Hope this works!!'}
    // ];
    Post.find()
      .then(documents => {
        res.status(200).json({
          message: 'Posts fetched successfully!',
          posts: documents
        });
      });
});

module.exports = app;

//q0NI5hYxtETODhD6
