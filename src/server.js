import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import swaggerUi from 'swagger-ui-express';
import specs from './docs/swagger.js';
import cors from 'cors';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Swagger Docs
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(specs));

// Basic root route
app.get('/', (req, res) => res.send('Welcome to NodeAtlas API!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
