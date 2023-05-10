import Link from 'next/link';
import { useRouter } from 'next/router';

function AdminHeader({ img }) {
  const { pathname } = useRouter();

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link href="/">
            <img width="38" src={img} alt="Pizza logo" />
            <div>
              <h1>Maxym's pizza</h1>
              <p>найсмачніша піца в Житомирі </p>
            </div>
          </Link>
        </div>
        <Link className="button" href={pathname.includes('order') ? '/admin' : '/admin/order'}>
          {pathname.includes('order') ? 'Піци' : 'Замовлення'}
        </Link>
      </div>
    </div>
  );
}

export default AdminHeader;
