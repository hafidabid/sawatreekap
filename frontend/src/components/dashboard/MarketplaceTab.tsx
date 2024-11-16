// components/Marketplace/MarketplaceTab.tsx
import React from 'react';
import SellTokenSection from './SellTokenSection';
import MerchandiseCard from './MerchendiseCard';

const merchandiseItems = [
    {
        id: 1,
        name: 'Eco-friendly Water Bottle',
        description: 'Reusable water bottle made from sustainable materials.',
        tokensRequired: 50,
        imageUrl: '/images/water-bottle.png',
    },
    {
        id: 2,
        name: 'Plantable Seed Paper Notebook',
        description: 'Notebook with pages made of seed paper. Plant it after use!',
        tokensRequired: 100,
        imageUrl: '/images/seed-paper-notebook.png',
    },
    {
        id: 3,
        name: 'Organic Cotton T-shirt',
        description: 'Comfortable t-shirt made from 100% organic cotton.',
        tokensRequired: 150,
        imageUrl: '/images/organic-tshirt.png',
    },
];

const MarketplaceTab: React.FC = () => {
    return (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <section className="mb-8">
                <SellTokenSection />
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-green-300 mb-4">Claim Merchandise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {merchandiseItems.map((item) => (
                        <MerchandiseCard key={item.id} {...item} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MarketplaceTab;
