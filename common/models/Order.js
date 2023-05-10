import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pizza: { type: Array, required: true },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
