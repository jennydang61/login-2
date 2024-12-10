import Header from './Header';
import React from 'react';

function HeaderLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default HeaderLayout;