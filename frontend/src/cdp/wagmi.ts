'use client';
import {connectorsForWallets} from '@rainbow-me/rainbowkit';
import {
    coinbaseWallet,
    metaMaskWallet,
    rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {useMemo} from 'react';
import {http, createConfig, createStorage, cookieStorage} from 'wagmi';
import {base, baseSepolia} from 'wagmi/chains';

export function useWagmiConfig() {


    return useMemo(() => {


        const wagmiConfig = createConfig({
            chains: [base],
            // turn off injected provider discovery
            multiInjectedProviderDiscovery: false,
            connectors: connectorsForWallets(
                [
               {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
            ],
                {
                    appName: 'onchainkit',
                  projectId: `${process.env.NEXT_PUBLIC_ONCHAIN_PROJECT_ID}`
                }
            ),
            storage: createStorage({
                storage: cookieStorage,
            }),
            ssr: true,
            transports: {
                [base.id]: http(), // add baseSepolia for testing
            },
        });

        return wagmiConfig;
    }, []);
}
