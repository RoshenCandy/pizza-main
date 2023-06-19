import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const OrderTable = () => {
  const [dataSource, setDataSource] = useState();

  const getOrder = () => {
    axios.get(`${process.env.DOMAIN_URL}/api/pizza/order`).then((response) => {
      setDataSource(response.data);
    });
  };

  useEffect(() => {
    getOrder();
  }, []);

  const columns = [
    {
      title: "Ім'я",
      dataIndex: 'name',
    },
    {
      title: 'Адреса',
      dataIndex: 'address',
    },
    {
      title: 'Номер телефону',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Замовлення',
      dataIndex: 'pizza',
      width: '250px',
      render: (pizza) =>
        pizza.map((el) => (
          <div key={el.id} className="orderItem">
            <p className="title">
              {el.title}
              {el.count > 1 && <span>: {el.count}</span>}
            </p>
            <p>Вид тіста - {el.type}</p>
            <p>Розмір - {el.size}</p>
          </div>
        )),
    },
  ];

  return <Table bordered dataSource={dataSource} columns={columns} pagination={false} rowKey="_id" />;
};

export default OrderTable;
