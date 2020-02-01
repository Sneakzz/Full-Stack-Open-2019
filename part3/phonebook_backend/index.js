require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Entry = require('./models/entry');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('tiny', {
  skip: (req) => { return req.method === 'POST'; }
}));

morgan.token('body', (req) => { return JSON.stringify(req.body); });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req) => { return req.method !== 'POST'; }
}));

app.get('/', (req, res) => {
  res.status(200).end('<h1>Homepage</h1>');
});

app.get('/info', (req, res, next) => {
  //collection total
  Entry.collection.countDocuments()
    .then(result => {
      const info = `Phonebook has info for ${result} people`;
      const date = new Date().toString();
      res.write(`<p>${info}</p>`);
      res.write(`<p>${date}</p>`);
      res.status(200).end();
    })
    .catch(err => next(err));
});

app.get('/api/persons', (req, res) => {
  Entry.find({})
    .then(entries => {
      res.json(entries.map(entry => entry.toJSON()));
    })
    .catch(err => {
      console.log('-----');
      console.log('error getting data from the database:', err.message);
      res.end();
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      if (entry) {
        res.json(entry.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number
  });

  entry.save()
    .then(savedEntry => {
      res.json(savedEntry.toJSON());
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const entry = {
    number: body.number
  };

  Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then(updatedEntry => {
      res.json(updatedEntry.toJSON());
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});