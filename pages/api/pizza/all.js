import start from '../../../common/lib/utils/start';
import Pizza from '../../../common/models/Pizza';

start();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const pizza = await Pizza.find({}).sort({ rating: -1 });
        return res.status(200).json(pizza);
      } catch (error) {
        return res.status(400).json(error);
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(425).end(`Method ${req.method} is not allowed.`);
  }
}
