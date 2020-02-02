require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

console.log('Connecting to MongoDB..');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.send(blogs);
    })
    .catch(error => {
      res.status(404).send({ error: `error retrieving blog list: ${error.message}` });
    });
});

app.post('/api/blogs', (req, res) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  });

  blog.save()
    .then(savedBlog => {
      res.status(201).send(savedBlog);
    })
    .catch(error => {
      res.status(400).send({ error: `Error saving the blog: ${error.message}` });
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});