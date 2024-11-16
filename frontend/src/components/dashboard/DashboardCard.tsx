import React from 'react';

interface DashboardCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    growth: string;
    growthDirection: 'up' | 'down';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, value, label, growth, growthDirection }) => {
    return (
        <div className="bg-gray-800 text-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-full">
            <div className="bg-gray-700 rounded-full p-3 mb-4">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold text-white">{value}</h3>
            <p className="text-gray-400">{label}</p>
            <p className={`text-sm ${growthDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {growth} {growthDirection === 'up' ? '↑' : '↓'}
            </p>
        </div>
    );
};

export default DashboardCard;
