import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PTcdeJBmrEScfKW22nDHxPXU0vXJ4EKK2pcMs29ZgGiZOu7i03BV3ujeQsgYfRJflGb3KFrV4lGvx7DqfmJLB2X00OFO4qavR'); // Replace with your key

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test Product',
          },
          unit_amount: 2000, // Amount in smallest currency unit
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ success: false, message: 'Error processing order' });
  }
};
