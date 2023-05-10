import Header from '../common/components/Header';
import { useState } from 'react';
import Cart from '../common/pages/Cart';
import { searchContext } from '.';

function CartPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Cart />
      </searchContext.Provider>
    </div>
  );
}

export default CartPage;
