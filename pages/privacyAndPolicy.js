import { useState } from 'react';
import Header from '../common/components/Header';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Footer from '../common/components/Footer';
import PrivacyAndPolicyPage from '../common/pages/PrivacyAndPolicyPage';
import { searchContext } from '.';

export default function PrivacyAndPolicy() {
  const [searchValue, setSearchValue] = useState('');
  const { status } = useSession();

  if (status === 'authenticated') signOut();

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <PrivacyAndPolicyPage />
        <Footer />
      </searchContext.Provider>
    </div>
  );
}
