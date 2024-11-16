import {
  ConnectWallet,
  Wallet,
  WalletDefault,
  WalletDropdown,
  WalletDropdownDisconnect
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import React from "react";

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
           <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
