'use client';
import {connectorsForWallets} from '@rainbow-me/rainbowkit';
import {
    coinbaseWallet,
    metaMaskWallet,
    rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {useMemo} from 'react';
import {http, createConfig, createStorage, cookieStorage} from 'wagmi';
import { GetChain } from './getchain';

export function useWagmiConfig() {

    const chain = GetChain()
    return useMemo(() => {


        const wagmiConfig = createConfig({
            chains: [chain],
            // turn off injected provider discovery
            multiInjectedProviderDiscovery: false,
            connectors: connectorsForWallets(
                [
                    {
                        groupName: 'Recommended Wallet',
                        wallets: [coinbaseWallet],
                    },
                    {
                        groupName: 'Other Wallets',
                        wallets: [rainbowWallet, metaMaskWallet],
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
            //@ts-ignore
            transports: {
                [chain.id]: http(), // add baseSepolia for testing
            },
        });

        return wagmiConfig;
    }, []);
}
