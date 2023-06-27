/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footer logo">
        <div className="header__logo">
          <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo" />
          <div>
            <h1>Maxym's pizza</h1>
            <p>найсмачніша піца в Житомирі </p>
          </div>
        </div>
        <Link href="/privacyAndPolicy">©Maksym’s pizza 2023. All rights received</Link>
      </div>
      <div className="footer contacts">
        <span className="title">Контакти</span>
        <span>097 123 45 67</span>
        <span>063 123 45 67</span>
        <span>0564 123 45 67</span>
      </div>

      <div className="footer contacts">
        <span className="title">Адреса</span>
        <span>м. Житомир</span>
        <span>Старий бульвар, 10</span>
        <span>вул. Михайлівська, 20</span>
      </div>

      <div className="payments">
        <img src="./img/visa.png" alt="visa" />
        <img src="./img/mastercard.png" alt="mastercard" />
        <img src="./img/applepay.png" alt="applePay" />
        <img src="./img/googlepay.png" alt="googlePay" />
      </div>
    </div>
  );
};

export default Footer;
