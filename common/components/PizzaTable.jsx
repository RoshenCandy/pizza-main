import { Button, Popconfirm, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import CreatePizzaForm, { categoriesValue, typesValue } from './CreatePizzaForm';
import PizzaModal from './PizzaModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setPizzaState } from '../redux/slices/addPizzaSlice';

const PizzaTable = () => {
  const [dataSource, setDataSource] = useState();
  const dispatch = useDispatch();
  const { pizzaState } = useSelector((state) => state.addPizza);
  const { isOpen } = useSelector((state) => state.addPizza);
  const [editPizza, setEditPizza] = useState(undefined);

  const getPizzas = () => {
    axios.get(`https://pizza-main-ecru.vercel.app/api/pizza/all`).then((response) => {
      console.log(response);
      setDataSource(response.data);
    });
  };

  const deletePizza = (id) => {
    axios.delete(`https://pizza-main-ecru.vercel.app/api/pizza/${id}`).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    getPizzas();
  }, [pizzaState]);

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'title',
      width: '18%',
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
      width: '10%',
    },
    {
      title: 'Розміри',
      dataIndex: 'sizes',
      width: '10%',
      render: (sizes) => <div>{sizes?.join(', ')}</div>,
    },
    {
      title: 'Категорія',
      dataIndex: 'category',
      width: '10%',
      render: (category) =>
        categoriesValue.map((e) => {
          if (e.category === category) return <span key={e.category}>{e.name}</span>;
        }),
    },
    {
      title: 'Тип',
      dataIndex: 'types',
      width: '15%',
      render: (type) =>
        type.map((e) =>
          typesValue.map((t) => {
            if (e === t.type) return <p key={type}>{t.name}</p>;
          })
        ),
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      render: (_, record) => <Rate value={record.rating} disabled className="rate" />,
      width: '17%',
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div className="pizza-options">
            <Button
              className="edit_btn"
              type="link"
              onClick={() => {
                dispatch(setIsOpen(true));
                setEditPizza(record);
              }}
            >
              <EditOutlined />
            </Button>

            <Popconfirm
              title="Видалити піцу?"
              className="popconfirm"
              onConfirm={() => {
                deletePizza(record._id);
                dispatch(setPizzaState(!pizzaState));
                message.success('Піцу видалено');
              }}
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <div>
        <Button
          onClick={() => {
            dispatch(setIsOpen(true));
            setEditPizza(undefined);
          }}
          type="ghost"
          style={{
            marginBottom: 16,
          }}
          className="button tableButton"
        >
          Add a pizza
        </Button>
        <Table bordered dataSource={dataSource} columns={columns} pagination={false} rowKey="_id" />
      </div>
      <PizzaModal open={isOpen} close={() => dispatch(setIsOpen(false))}>
        <CreatePizzaForm editPizza={editPizza} />
      </PizzaModal>
    </>
  );
};
export default PizzaTable;
