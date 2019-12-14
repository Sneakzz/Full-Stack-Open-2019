const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

console.log('-----');
console.log('Trying to connect to MongoDB...');

mongoose.connect(url, { useNewUrlParser: true })
  .then(res => {
    console.log('-----');
    console.log('Succesfully connected to MongoDB');
  })
  .catch(err => {
    console.log('-----');
    console.log('error connecting to MongoDB:', err.message);
  });

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 8
  }
});

entrySchema.plugin(uniqueValidator);

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Entry', entrySchema);