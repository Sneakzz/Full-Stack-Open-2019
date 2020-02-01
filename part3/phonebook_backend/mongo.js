const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('You must at least provide a password');
  process.exit(1);
}

const password = process.argv[2];
const entryname = process.argv[3];
const entrynumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0-xgci0.gcp.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('Succesfully connected to the database');
  })
  .catch(() => {
    console.log('Failed to connect to the database, check the password');
    process.exit(1);
  });

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
});

const Entry = mongoose.model('entry', entrySchema);

const getEverything = () => {
  Entry.find({})
    .then(res => {
      console.log('phonebook:');
      res.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`);
      });
      mongoose.connection.close();
    })
    .catch(() => {
      console.log('something went wrong trying to retrieve the data');
      mongoose.connection.close();
    });
};

const addEntry = () => {
  const newEntry = new Entry({
    name: entryname,
    number: entrynumber
  });

  newEntry.save()
    .then(res => {
      console.log(`added ${res.name} number ${res.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(() => {
      console.log('something went wrong adding the entry to the phonebook');
      mongoose.connection.close();
    });
};

if (entryname === undefined || entrynumber === undefined) {
  console.log('To add an entry make sure a name and number are provided');
  getEverything();
} else {
  addEntry();
}