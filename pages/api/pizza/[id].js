import start from '../../../common/lib/utils/start';
import Pizza from '../../../common/models/Pizza';

start();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const pizza = await Pizza.findById(req.query.id);
        return res.status(201).json(pizza);
      } catch (error) {
        return res.status(400).json(error);
      }
    case 'PATCH':
      try {
        const pizza = await Pizza.findByIdAndUpdate(req.query.id, req.body);
        return res.status(201).json(pizza);
      } catch (error) {
        return res.status(400).json(error);
      }
    case 'DELETE':
      try {
        const pizza = await Pizza.findByIdAndDelete(req.query.id);
        return res.status(201).json(pizza);
      } catch (error) {
        return res.status(400).json(error);
      }
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(425).end(`Method ${req.method} is not allowed.`);
  }
}
