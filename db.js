const mongoose = require('mongoose');
mongoose.Promise = global.Promise;// implement promise for return database

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () =>{
    console.log('[db] DB is connected');
});

module.exports = connect;