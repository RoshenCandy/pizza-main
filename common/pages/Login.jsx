import React from 'react';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div className="login">
      <div className="header__logo">
        <Link href="/">
          <div>
            <h1>Maxym's pizza</h1>
            <p>найсмачніша піца в Житомирі </p>
          </div>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
