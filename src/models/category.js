import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

export const Category = mongoose.model('categories', categorySchema);
