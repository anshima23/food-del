import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173/";

  try {
      // Validate request data
      const { userId, items, amount, address } = req.body;
      if (!userId || !items || !amount || !address) {
          throw new Error("Missing required fields");
      }

      // Create and save new order
      const newOrder = new orderModel({
          userId,
          items,
          amount,
          address
      });
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Prepare line items for Stripe
      const line_items = items.map((item) => ({
          price_data: {
              currency: "inr",
              product_data: {
                  name: item.name
              },
              unit_amount: item.price * 100
          },
          quantity: item.quantity
      }));

      line_items.push({
          price_data: {
              currency: "inr",
              product_data: {
                  name: "Delivery Charges"
              },
              unit_amount: 2 * 100
          },
          quantity: 1
      });

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
          success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });

      res.json({ success: true, session_url: session.url });
  } catch (error) {
      console.error('Error placing order:', error.message);
      res.status(500).json({ success: false, message: "Error processing order" });
  }
};

  
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
}

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
}

export { placeOrder, verifyOrder, userOrders };
