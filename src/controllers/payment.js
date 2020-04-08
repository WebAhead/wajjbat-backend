import Payment from '../queries/Payment';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function handleCharge (req, res) {
  const token = req.body.paymentData.token;

  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: token
  });

  if (charge.object === 'charge') {
    try {
      const addClicks = await Payment.addClicks(req.body.business, req.body.clicks);

      res.json(addClicks);
    } catch (error) {
      // fail!
      console.log('failed to add to db');
    }
  } else {
    // fail!
    console.log('failed to charge');
  }
};
