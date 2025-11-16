import express from 'express';
import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/').get(getTodo).post(createTodo);
router.route('/:id').put(updateTodo).delete(deleteTodo);

export default router;
