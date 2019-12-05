// import mongoose
const mongoose = require('mongoose');

// check if we have the required argument, otherwise exit
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// get the argument
const password = process.argv[2];

// create the url for connecting to mongodb
const url = `mongodb+srv://fullstack:${password}@cluster0-xgci0.gcp.mongodb.net/note-app?retryWrites=true&w=majority`;

// attempt to connect to the database using the created url
mongoose.connect(url, {useNewUrlParser: true})
.catch(error => {
  console.log('Could not connect to database with given password');
  process.exit(1);
});

// create a "schema" for the object we want to store
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

// create a model for the object using the schema for the object
const Note = mongoose.model('Note', noteSchema);

// // create model for a note that is structured like the schema
// const note = new Note({
//   content: 'Browser can execute only Javascript',
//   date: new Date(),
//   important: true
// });

// // save the object and then closes the db connection
// note.save().then(res => {
//   console.log("Note saved!");
//   mongoose.connection.close();
// });

// get all the notes stored in the database and print them out
Note.find({}).then(res => {
  res.forEach(note => {
    console.log(note);
  });
});

// get all notes stored in the database with the given search criteria
Note.find({important: true}).then(res => {
  res.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});