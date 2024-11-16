import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import Leaderboard from '@/components/dashboard/Leaderboard';

const LeaderboardTab: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <Leaderboard />
        </Layout>
    );
};

export default LeaderboardTab;
