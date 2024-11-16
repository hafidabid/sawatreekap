import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import AchievementTab from '@/components/dashboard/AchievementTab';

const Achievement: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Achievement</h1>
            <AchievementTab />
        </Layout>
    );
};

export default Achievement;
