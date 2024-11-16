import NFTCard from './NFTCard';

const questNFTs = [
    {
        id: 1,
        title: 'Bronze Tree Planter',
        description: 'Awarded for completing the "Plant 10 Trees" quest.',
        imageUrl: '/images/bronze-tree-planter.png',
    },
    {
        id: 2,
        title: 'Silver Tree Planter',
        description: 'Awarded for completing the "Plant 50 Trees" quest.',
        imageUrl: '/images/silver-tree-planter.png',
    },
];

const treeNFTs = [
    {
        id: 1,
        title: 'Tree NFT #1',
        description: 'Awarded for planting a tree on 11/15/2024.',
        imageUrl: '/images/tree-nft1.png',
    },
    {
        id: 2,
        title: 'Tree NFT #2',
        description: 'Awarded for planting a tree on 11/16/2024.',
        imageUrl: '/images/tree-nft2.png',
    },
];

const AchievementTab: React.FC = () => {
    return (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md max-w-4xl ml-0">
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-green-300 mb-4">Quest Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {questNFTs.map((nft) => (
                        <NFTCard key={nft.id} title={nft.title} description={nft.description} imageUrl={nft.imageUrl} />
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-green-300 mb-4">Tree Planting Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {treeNFTs.map((nft) => (
                        <NFTCard key={nft.id} title={nft.title} description={nft.description} imageUrl={nft.imageUrl} />
                    ))}
                </div>
            </section>
        </div>

    );
};

export default AchievementTab;
