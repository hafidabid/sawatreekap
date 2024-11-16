import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import QuestTab from '@/components/dashboard/QuestTab';

const Quest: React.FC = () => {
    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quest</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white px-12 py-2 rounded-full font-semibold ml-auto">
                    Plant Tree
                </button>
            </div>
            <QuestTab />
        </Layout>
    );
};

export default Quest;
