import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import QuestTab from '@/components/dashboard/QuestTab';

interface Quest {
    id: number;
    title: string;
    description: string;
    reward: string;
    status: 'Achieved' | 'In Progress';
}

interface QuestsPageProps {
    quests: Quest[];
}

const QuestsPage: React.FC<QuestsPageProps> = ({ quests }) => {
    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quest</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white px-12 py-2 rounded-full font-semibold ml-auto">
                    Plant Tree
                </button>
            </div>
            <QuestTab quests={quests} />
        </Layout>
    );
};

export async function getServerSideProps() {
    const res = await fetch('https://sawatreekap-api.anak-kabupaten.my.id/quests?order_by=created_at&order_direction=asc');
    const data = await res.json();

    // Transform API response to fit the component structure if needed
    const quests = data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        reward: 'Tree NFT',
        status: item.num_of_tree >= 10 ? 'Achieved' : 'In Progress',
    }));

    return {
        props: {
            quests,
        },
    };
}

export default QuestsPage;

