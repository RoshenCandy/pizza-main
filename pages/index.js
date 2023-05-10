import { createContext, useEffect, useState } from 'react';
import HomePage from '../common/pages/Home';
import Header from '../common/components/Header';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export const searchContext = createContext();

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { status } = useSession();

  if (status === 'authenticated') signOut();

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <HomePage />
      </searchContext.Provider>
    </div>
  );
}
