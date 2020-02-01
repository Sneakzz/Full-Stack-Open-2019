const app = require('./app'); // the actual Express app
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

// require('dotenv').config();
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Note = require('./models/note');

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

// const requestLogger = (request, response, next) => {
//   console.log('Method: ', request.method);
//   console.log('Path: ', request.path);
//   console.log('Body: ', request.body);
//   console.log('---');
//   next();
// }

// app.use(express.static('build'));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(requestLogger);

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (req, res) => {
//   Note.find({})
//     .then(notes => {
//       res.json(notes.map(note => note.toJSON()));
//     })
//     .catch(err => {
//       console.log('something went wrong trying to get notes from the database');
//     });
// });

// app.get('/api/notes/:id', (req, res, next) => {
//   Note.findById(req.params.id)
//     .then(note => {
//       if (note) {
//         res.json(note.toJSON());
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(err => next(err));
// });

// app.post('/api/notes', (req, res, next) => {
//   const body = req.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date()
//   });

//   note
//     .save()
//     .then(savedNote => savedNote.toJSON())
//     .then(savedAndFormattedNote => {
//       res.json(savedAndFormattedNote);
//     })
//     .catch(err => next(err));
// });

// app.put('/api/notes/:id', (req, res, next) => {
//   const body = req.body;

//   const note = {
//     content: body.content,
//     important: body.important
//   }

//   Note.findByIdAndUpdate(req.params.id, note, { new: true })
//     .then(updatedNote => {
//       res.json(updatedNote.toJSON());
//     })
//     .catch(err => next(err));
// });

// app.delete('/api/notes/:id', (req, res, next) => {
//   Note.findByIdAndDelete(req.params.id)
//     .then(result => {
//       res.status(204).end()
//     })
//     .catch(err => next(err));
// });

// const unknownEndpoint = (req, res) => {
//   res.status(404).send({ error: 'unknown endpoint' });
// }

// app.use(unknownEndpoint);

// const errorHandler = (err, req, res, next) => {
//   console.error(err.message);

//   if (err.name === 'CastError' && err.kind === 'ObjectId') {
//     return res.status(400).send({ error: 'malformatted id' });
//   } else if (err.name === 'ValidationError') {
//     return res.status(400).json({ error: err.message });
//   }

//   next(err);
// }

// app.use(errorHandler);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });