import Stripe from 'stripe'


const stripe = new Stripe(process.env.SECRET_KEY);

export const payment = async (req, res) => {
   try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // price * 100
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}