import todoModel from '../models/todoModel.js';

export const getTodo = async (req, res) => {
  try {
    const todo = await todoModel.find().sort({ createdAt: -1 });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await todoModel.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
};
