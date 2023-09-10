import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.js';

//Create a new order
//POST /api/orders
//Private
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    user,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items!');
  } else {
    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//Get order by ID
//GET /api/orders/:id
//Private
const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'firstName lastName email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

//Update order as paid
//GET /api/orders/:id/pay
//Private
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //Ovo sto sledi mi zapravo paypal vraca!
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

//Update order as delivered
//GET /api/orders/:id/deliver
//Private/Admin
const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

//Get all user's orders
//GET /api/orders/myorders
//Private
const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

//Get all orders
//GET /api/orders/
//Private/Admin
const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'firstName lastName');

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
