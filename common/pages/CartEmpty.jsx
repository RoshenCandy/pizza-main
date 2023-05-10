import React from 'react';
import Link from 'next/link';

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Кошик пустий <icon>😕</icon>
        </h2>
        <p>
          Ймовірніше всього, ви ще не вибрали ні одну піцу.
          <br />
          Щоб вибрати піцу, перейдіть на головну сторінку.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <Link href="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
