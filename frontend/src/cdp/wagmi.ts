'use client';
import {useMemo} from 'react';
import {http, createConfig, createStorage, cookieStorage} from 'wagmi';
import { GetChain } from './getchain';
import { coinbaseWallet } from 'wagmi/connectors';

export function useWagmiConfig() {

    const chain = GetChain()
    return useMemo(() => {


        const wagmiConfig = createConfig({
            chains: [GetChain()], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: 'smartWalletOnly',
        version: '4',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
     //@ts-ignore
    transports: {
      [GetChain().id]: http(), // add baseSepolia for testing
    },
        });

        return wagmiConfig;
    }, []);
}
