const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true, min: [1] },
  price: { type: Number, required: true },
  type: { type: String, enum: ['buy', 'sell'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
