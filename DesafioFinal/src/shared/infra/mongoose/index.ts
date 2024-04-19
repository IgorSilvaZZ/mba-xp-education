import mongoose from 'mongoose';

export const connectMongo = async (): Promise<void> => {
  await mongoose.connect('mongodb://localhost:27017/library');
};
