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

// Auth error handling for express-jwt
app.use((err, req, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message });
    console.log("Error: ", err);
  }
});

export default app;