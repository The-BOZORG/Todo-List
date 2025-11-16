import express from 'express';
import connectDB from './database/dbconnect.js';
import router from './routes/todoRoute.js';
import logRequest from './middlewares/logger.js';

const app = express();

app.use(express.static('src'));
app.use(express.json());
app.use(logRequest);
connectDB();

const PORT = process.env.PORT || 9000;

app.use('/', router);

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
