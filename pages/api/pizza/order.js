import start from '../../../common/lib/utils/start';
import Order from '../../../common/models/Order';

start();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const order = await Order.find({});
        return res.status(200).json(order);
      } catch (error) {
        return res.status(400).json(error);
      }
    case 'POST':
      try {
        const order = await Order.create(req.body);
        return res.status(200).json(order);
      } catch (error) {
        return res.status(400).json(error);
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(425).end(`Method ${req.method} is not allowed.`);
  }
}
