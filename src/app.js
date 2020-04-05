import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import apiRoutes from './routes/api';
import adminRoutes from './routes/admin';
import cookieParser from 'cookie-parser';

//added for payment
import { resolve } from 'path';
import env from 'dotenv/config';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

// const createCustomer = async () => {
//   const params: Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   };

//   const customer: Stripe.Customer = await stripe.customers.create(params);

//   console.log(customer.id);
// };
// createCustomer();

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

// initialize passport

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/social', social);

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

//Payment Issues
app.get("/payment/checkout", (req, res) => {
  // Display checkout page
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

const inventory = {Gold: 200, Silver: 100, Copper: 50}
const calculateOrderAmount = items => {
  let sum=0;
  items.forEach(item => { 
    sum+=parseInt(inventory[item]);});
  return sum;
};

app.post("/payment/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency
  });
  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post("/webhook", async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
});
