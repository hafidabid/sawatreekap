import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import AchievementTab from '@/components/dashboard/AchievementTab';

const Achievement: React.FC = () => {
    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Achievement</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white px-12 py-2 rounded-full font-semibold ml-auto">
                    Plant Tree
                </button>
            </div>
            <AchievementTab />
        </Layout>

    );
};

export default Achievement;
