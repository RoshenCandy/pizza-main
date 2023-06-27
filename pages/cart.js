import Header from '../common/components/Header';
import { useState } from 'react';
import Cart from '../common/pages/Cart';
import { searchContext } from '.';
import Footer from '../common/components/Footer';

function CartPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Cart />
        <Footer />
      </searchContext.Provider>
    </div>
  );
}

export default CartPage;
