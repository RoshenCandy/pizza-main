import React from 'react'
import axios from 'axios';
import { Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../redux/slices/addPizzaSlice';
import { clearItems } from '../redux/slices/cartSlice';
import { useRouter } from 'next/router';

const OrderForm = (pizzas) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const {push} = useRouter()


  const onFinish = (e) => {
    axios.post('http://localhost:3000/api/pizza/order', { ...e, pizza: [...pizzas.pizzas] })
      .then(response => console.log(response))
      .catch(error => console.log(error))


    pizzas.pizzas.map(el => {
      axios.patch(`http://localhost:3000/api/pizza?id=${el.id}`,{count: el.count})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    })

    push('/')
    message.success('Ваше замовлення готується')
    dispatch(clearItems())
    dispatch(setIsOpen(false))
    form.resetFields()
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      className='form'
      requiredMark={false}
    >
      <Form.Item
        label="Ім'я"
        name="name"
        rules={[{ required: true, message: "Введіть ім'я" }]}
      >
        <Input placeholder="Ім'я" />
      </Form.Item>

      <Form.Item
        label="Адреса"
        name="address"
        rules={[{ required: true, message: 'Введіть адресу' }]}
      >
        <Input placeholder='Адреса' />
      </Form.Item>

      <Form.Item
        label='Номер телефону'
        name="phoneNumber"
        rules={[{ required: true, message: 'Введіть номер телефону' }]}
      >
        <Input placeholder='Номер телефону' />
      </Form.Item>

      <Button className='button formButton' htmlType='submit'>Підтвердити</Button>
    </Form>
  )
}

export default OrderForm