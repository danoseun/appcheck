import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.ATLAS_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
    return db;
  } catch (error) {
    console.log(error);
    return console.log('Error connecting');
  }
};

export default connect;
