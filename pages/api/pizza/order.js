import start from '../../../common/lib/utils/start';
import Order from '../../../common/models/Order';

const nodemailer = require('nodemailer');

async function sent() {
  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'c9fc7906ec1601',
      pass: '0d994a9a486fad',
    },
  });

  const info = await transport.sendMail({
    from: 'pizza-order <test@gmail.com>',
    to: 'pizza-admin@gmail.com',
    subject: 'Maxym`s pizza',
    text: 'Ваше замовлення в обробці',
    html: 'Ваше замовлення в обробці',
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

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
        await sent().catch('sent mail error: ' + console.error);
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
