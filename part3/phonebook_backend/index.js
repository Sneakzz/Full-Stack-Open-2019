const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const persons = [
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});