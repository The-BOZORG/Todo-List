import mongoose from 'mongoose';

const todoModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', todoModel);
