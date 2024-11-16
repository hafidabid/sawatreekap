import React from 'react';
import "../../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import QuestTab from '@/components/dashboard/QuestTab';

const Quest: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Quest</h1>
            <QuestTab />
        </Layout>
    );
};

export default Quest;
