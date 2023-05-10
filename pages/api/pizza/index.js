import start from '../../../common/lib/utils/start'
import Pizza from '../../../common/models/Pizza'

start()

export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      try {
        const pizza = await Pizza
          .find(req.query.categoryId === '0' ? {title: new RegExp(req.query.search, 'i')} : { category: req.query.categoryId, title: new RegExp(req.query.search, 'i') })
          .sort({ [req.query.sortBy]: -1 })
          .skip(req.query.currentPage * req.query.limit - req.query.limit)
          .limit(req.query.limit)
        return res.status(200).json(pizza)
      } catch (error) {
        return res.status(400).json(error)
      }
    case 'POST':
      try {
        const pizza = await Pizza.create(req.body)
        return res.status(201).json(pizza)
      } catch (error) {
        return res.status(400).json(error)
      }
    case 'PATCH':
      try{
        const pizza = await Pizza.findById(req.query.id)
        pizza.ordersCount += req.body.count
        pizza.rating = Math.floor(pizza.ordersCount * 0.05)
        pizza.save()
        return res.status(201).json(pizza)
      }catch(error){
        return res.status(400).json(error)
      }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH'])
      res.status(425).end(`Method ${req.method} is not allowed.`)
  }
}