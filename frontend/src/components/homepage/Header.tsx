"use client"
import React from "react";
import {
    Address,
    Avatar,
    EthBalance,
    Identity,
    Name,
} from "@coinbase/onchainkit/identity";
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";

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
                            <Avatar className="h-6 w-6"/>
                            <Name/>
                        </ConnectWallet>
                        <WalletDropdown>
                            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
                                <Avatar/>
                                <Name/>
                                <Address/>
                                <EthBalance/>
                            </Identity>
                            <WalletDropdownBasename/>
                            <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
                                Go to Wallet Dashboard
                            </WalletDropdownLink>
                            <WalletDropdownFundLink/>
                            <WalletDropdownDisconnect/>
                        </WalletDropdown>
                    </Wallet>
                </div>
            </nav>
        </header>
    );
};

export default Header;
