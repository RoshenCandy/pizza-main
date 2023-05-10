import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const OrderTable = () => {
  const [dataSource, setDataSource] = useState();

  const getOrder = () => {
    axios.get(`http://localhost:3000/api/pizza/order`).then((response) => {
      console.log('res', response);
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
      render: (pizza) =>
        pizza.map((el) => (
          <p key={el.id}>
            {el.title}: {el.count}
          </p>
        )),
    },
  ];

  return <Table bordered dataSource={dataSource} columns={columns} pagination={false} rowKey="_id" />;
};

export default OrderTable;
