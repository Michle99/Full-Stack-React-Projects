import express from 'express';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template'
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'

// define the express app
const app = express();

// making the root template available
app.get('/', (req, res) => {
  res.status(200).send(Template());
});

// User Routes
app.use('/', userRoutes);
// Restrict access to user operations
app.use('/', authRoutes)

/** configure express */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());


export default app;