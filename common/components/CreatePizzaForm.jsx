/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber, message, Space } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setPizzaState } from '../redux/slices/addPizzaSlice';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const sizesValue = [26, 30, 40];

export const typesValue = [
  {
    type: 0,
    name: 'тонке',
  },
  {
    type: 1,
    name: 'традиційне',
  },
];

export const categoriesValue = [
  {
    category: 1,
    name: "М'ясні",
  },
  {
    category: 2,
    name: 'Вегетаріанські',
  },
  {
    category: 3,
    name: 'Гриль',
  },
  {
    category: 4,
    name: 'Гострі',
  },
  {
    category: 5,
    name: 'Закриті',
  },
];

function CreatePizzaForm({ editPizza }) {
  const dispatch = useDispatch();
  const { pizzaState } = useSelector((state) => state.addPizza);
  const [form] = Form.useForm();

  const onCreateFinish = (e) => {
    axios
      .post(`${process.env.DOMAIN_URL}/api/pizza`, { ingredients: e.ingredients, ...e, rating: 1, ordersCount: 0 })
      .then((response) => console.log(response))
      .catch((error) => message.error(error));

    message.success('Піцу створено');
    form.resetFields();
    dispatch(setPizzaState(!pizzaState));
    dispatch(setIsOpen(false));
  };

  const onEditFinish = (e) => {
    axios
      .patch(`${process.env.DOMAIN_URL}/api/pizza/${editPizza._id}`, { ...e })
      .then((response) => console.log(response))
      .catch((error) => message.error(error));

    message.success('Піцу відредаговано');
    form.resetFields();
    dispatch(setPizzaState(!pizzaState));
    dispatch(setIsOpen(false));
  };

  useEffect(() => {
    form.resetFields();
  }, [editPizza]);

  return (
    <Form layout="vertical" onFinish={editPizza ? onEditFinish : onCreateFinish} autoComplete="off" form={form} className="form" requiredMark={false}>
      <Form.Item
        label="Назва піци"
        name="title"
        rules={[{ required: true, message: 'Введіть назву піци' }]}
        initialValue={editPizza ? editPizza.title : undefined}
      >
        <Input placeholder="Назва піци" />
      </Form.Item>

      <Form.Item
        label="Ціна"
        name="price"
        rules={[{ required: true, message: 'Введіть ціну' }]}
        initialValue={editPizza ? editPizza.price : undefined}
      >
        <InputNumber placeholder="Ціна" controls={false} />
      </Form.Item>

      <Form.Item
        label="Фото"
        name="image"
        rules={[{ required: true, message: 'Введіть URL зображення' }]}
        initialValue={editPizza ? editPizza.image : undefined}
      >
        <Input placeholder="Введіть URL" />
      </Form.Item>

      <Form.Item
        required
        name="sizes"
        label="Розмір"
        rules={[
          {
            required: true,
            message: 'Виберіть розмір!',
          },
        ]}
        initialValue={editPizza ? editPizza.sizes : undefined}
      >
        <Select mode="multiple" size="large" placeholder="Виберіть розмір">
          {sizesValue.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        required
        name="types"
        label="Тип"
        rules={[
          {
            required: true,
            message: 'Виберіть тип!',
          },
        ]}
        initialValue={editPizza ? editPizza.types : undefined}
      >
        <Select mode="multiple" size="large" placeholder="Виберіть тип">
          {typesValue.map((item) => (
            <Select.Option key={item.type} value={item.type}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        required
        name="category"
        label="Категорія"
        rules={[
          {
            required: true,
            message: 'Виберіть категорію!',
          },
        ]}
        initialValue={editPizza ? editPizza.category : undefined}
      >
        <Select size="large" placeholder="Виберіть категорію" placement="topRight">
          {categoriesValue.map((item) => (
            <Select.Option key={item.category} value={item.category}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <p style={{ marginBottom: '10px' }}>Додайте інгрідієнти:</p>
      <Form.List name="ingredients">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item {...restField} name={[name]} rules={[{ required: true, message: 'Missing ingridient' }]}>
                  <Input placeholder="Інгрідієнт" size="large" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Додати інгрідієнт
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Button className="button formButton" htmlType="submit">
        Зберегти
      </Button>
    </Form>
  );
}

export default CreatePizzaForm;
