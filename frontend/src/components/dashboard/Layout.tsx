// components/Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="fixed top-0 left-64 right-0 h-16 bg-gray-900 z-10">
        <Header />
      </div>
      <div className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
