import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import AdminHeader from '../../common/components/AdminHeader';
import Admin from '../../common/pages/Admin';


function admin() {
  const { status } = useSession()
  const { push } = useRouter()

  let content

  if (status === 'loading') content = <></>
  else if (status === 'unauthenticated') push('/auth/login')
  else content = <div className='wrapper'>
    <AdminHeader img='./img/pizza-logo.svg' />
    <Admin />
  </div>

  return content
}

export default admin