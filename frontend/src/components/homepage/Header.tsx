"use client";
import React from "react";
import WalletProfile from "@/components/wallet/WalletProfile";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center pt-10 px-32 bg-black text-white">
      <h1 className="text-2xl">Sawatreekap</h1>
      <nav>
        <ul className="flex space-x-16 text-lg">
          <li>
            <a href="#" className="hover:text-green-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-400">
              Explore
            </a>
          </li>
        </ul>
      </nav>
      <nav>
        <div className="flex mt-4 sm:justify-center sm:mt-0">
          {/* <WalletDefault /> */}
          <WalletProfile buymode={false} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
