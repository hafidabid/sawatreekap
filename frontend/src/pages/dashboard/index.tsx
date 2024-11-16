import React from 'react';
import "../../styles/global.css";
import Layout from '@/components/dashboard/Layout';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import ChartCard from '@/components/dashboard/ChartCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white px-12 py-2 rounded-full font-semibold ml-auto">
                    Plant Tree
                </button>
            </div>
            <DashboardGrid />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                <ChartCard />
                <ActivityTimeline />
            </div>
        </Layout>
    );
};

export default Dashboard;
