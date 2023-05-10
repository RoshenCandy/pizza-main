import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import AdminHeader from '../../common/components/AdminHeader';
import OrderPage from '../../common/pages/OrderPage';

const order = () => {
  const { status } = useSession()
  const { push } = useRouter()

  let content

  if (status === 'loading') content = <></>
  else if (status === 'unauthenticated') push('/auth/login')
  else content = <div className='wrapper'>
    <AdminHeader img='../img/pizza-logo.svg'/>
    <OrderPage/>
  </div>

  return content
}

export default order