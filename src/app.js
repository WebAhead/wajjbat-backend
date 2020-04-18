import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import apiRoutes from './routes/api';
import adminRoutes from './routes/admin';
import paymentRoutes from './routes/payment';
import cookieParser from 'cookie-parser';

const mongoose = require('mongoose');
const social = require('./routes/social');

const app = express();

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: process.env.ORIGIN.split(',')
  })
);
app.options('*', cors());

// initialize passport
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/social', social);
app.use('/payment', paymentRoutes);

// connect to database
mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

mongoose.connection
  .once('open', () => {
    console.log('Connected');
  })
  .on('error', error => {
    console.log('connectiong error:', error);
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
