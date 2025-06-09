// const { default: mongoose } = require('mongoose');
// const mongose = require('mongoose');
// const dbConfig = {
//   url: 'mongodb://localhost:27017/SparkX',  
// };

// const connectDB = async () => {
//   try {
//     await mongose.connect(dbConfig.url);
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// }

// module.exports = {mongoose, connectDB, dbConfig};

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;