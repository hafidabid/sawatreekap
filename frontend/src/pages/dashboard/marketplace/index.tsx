import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import MarketplaceTab from '@/components/dashboard/MarketplaceTab';

const MarketTab: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <MarketplaceTab />
        </Layout>
    );
};

export default MarketTab;
