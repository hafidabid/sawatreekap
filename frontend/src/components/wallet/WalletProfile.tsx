"use client";

import { GetChain } from "@/cdp/getchain";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
  useAddress,
} from "@coinbase/onchainkit/identity";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import React, { useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { createSiweMessage } from "viem/siwe";
import {
  Checkout,
  CheckoutButton,
  CheckoutStatus,
} from "@coinbase/onchainkit/checkout";
import { useSignMessage } from "wagmi";

interface WalletProfileI {
  buymode: boolean;
}
export default function WalletProfile(props: WalletProfileI) {
  const { address, isConnected } = useAccount();
  const { disconnect, token } = useAuth();
  const { signMessage } = useSignMessage();

  useEffect(() => {
    console.log("Wallet Address:", address);
    console.log("Is Connected:", isConnected);
  }, [address, isConnected]);

  if (token && isConnected && props.buymode) {
    return (
      <Checkout productId={process.env.NEXT_PUBLIC_TREE_PRODUCT_ID}>
        <CheckoutButton coinbaseBranded text="Let's plant a tree!" />
      </Checkout>
      // <></>
    );
  }
  return (
    <div className="">
      <Wallet className="">
        <ConnectWallet
          withWalletAggregator={false}
          // onConnect={() => {
          //   console.log("onConnect");
          //   signMessageAsync().then(() => {});
          // }}
          text="Join us"
        >
          <Avatar className="h-6 w-6 bg-gray-500 border-2 border-white " />
          <Name className="text-white" />
        </ConnectWallet>
        <WalletDropdown className="bg-gray-900 text-white pb-4">
          <Identity
            className="px-4 pt-3 pb-2 dark:bg-gray-800 dark:text-white"
            hasCopyAddressOnClick={true}
          >
            <Address className="dark:text-gray-400" />
          </Identity>
          <WalletDropdownLink
            icon="wallet"
            href="/dashboard"
            className="dark:text-white dark:hover:bg-gray-800"
          >
            Go to User Dashboard
          </WalletDropdownLink>
          <div
            className="flex items-center mt-4 px-4 py-6 space-x-2 text-red-500 hover:bg-gray-800 hover:text-white cursor-pointer"
            onClick={() => disconnect()}
          >
            Logout / Disconnect
          </div>
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
