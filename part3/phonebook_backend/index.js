const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(morgan('tiny', {
  skip: (req, res) => { return req.method === "POST" }
}));

morgan.token('body', (req, res) => {return JSON.stringify(req.body)});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => { return req.method !== "POST" }
}));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

app.get('/', (req, res) => {
  res.status(200).end('<h1>Homepage</h1>');
});

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date = new Date().toString();

  res.write(`<p>${info}</p>`);
  res.write(`<p>${date}</p>`);
  res.status(200).end();
});

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const min = 5
  const max = Number.MAX_SAFE_INTEGER;
  const newId = Math.floor(Math.random() * (max - min)) + min;
  return newId;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  let AlreadyExists;

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing'
    });
  } else {
    alreadyExists = persons.some(p => p.name === body.name);
  }

  if (alreadyExists) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number is missing'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});