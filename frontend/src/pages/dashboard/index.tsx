import React from 'react';
import "../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import ChartCard from '@/components/dashboard/ChartCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <DashboardGrid />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                <ChartCard />
                <ActivityTimeline />
            </div>
        </Layout>
    );
};

export default Dashboard;
