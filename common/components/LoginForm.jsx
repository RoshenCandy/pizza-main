import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function LoginForm() {
  const [form] = Form.useForm();
  const { push } = useRouter();

  const onSubmit = async (values) => {
    const res = await signIn('credentials', {
      username: values.login,
      password: values.password,
      redirect: false,
    });

    if (res.ok) push('/admin');
    else message.error('Невірні дані для входу!');
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} rootClassName="loginForm">
      <Form.Item label="Логін" name="login">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Пароль" name="password">
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item className="loginButtonItem">
        <Button className="button loginButton" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
