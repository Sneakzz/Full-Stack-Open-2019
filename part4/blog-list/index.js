const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb connection string';

mongoose.connect(mongoUrl, { useNewurlParser: true });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    });
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.status(201).json(result);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});