var mongoose = require('mongoose');

var DataBase = "Stock";

const connectToDb = async () => {

mongoose.set('strictQuery', false);

await mongoose
  .connect('YOUR CONNECTION STRING HERE')
  .then((x) => {
    console.log(`MongoDB Connected Successfully!`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  });

}

  module.exports = {connectToDb};
