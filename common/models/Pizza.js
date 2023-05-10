import mongoose, { Schema } from 'mongoose'

const PizzaSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  sizes: [{ type: Number }],
  types: [{ type: Number }],
  category: { type: Number, required: true },
  rating: { type: Number, required: true },
  ordersCount: { type: Number, required: true }
})

const Pizza = mongoose.models.Pizza || mongoose.model('Pizza', PizzaSchema)
export default Pizza