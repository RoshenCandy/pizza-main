import start from '../../../common/lib/utils/start';
import Order from '../../../common/models/Order';

const nodemailer = require('nodemailer');

function sent(orderInfo) {
  const message = `<div>
    <h3>-----Замовник-----</h3>
    <p>${orderInfo.name}</p>
    <p>${orderInfo.address}</p>
    <p>${orderInfo.phoneNumber}</p>
    <h3>-----Замовлення-----</h3>
    ${orderInfo.pizza.map(
      (el) => `<div>
      <p>${el.title}: ${el.count}</p>
      <p>Вид тіста - ${el.type}</p>
      <p>Розмір - ${el.size}</p>
    </div>`
    )}
  </div>`;
  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'c9fc7906ec1601',
      pass: '0d994a9a486fad',
    },
  });

  const info = transport.sendMail({
    from: 'pizza-order <test@gmail.com>',
    to: 'pizza-admin@gmail.com',
    subject: 'Maxym`s pizza',
    html: message.replace(/,/g, '-----'),
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
        const order = await Order.create(req.body);
        sent(req.body);
        return res.status(200).json(order);
      } catch (error) {
        return res.status(400).json(error);
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(425).end(`Method ${req.method} is not allowed.`);
  }
}
