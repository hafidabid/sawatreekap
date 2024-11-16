// components/Leaderboard/Leaderboard.tsx
import React, { useState } from 'react';
import LeaderboardTab from './LeaderboardTab';

type TabType = 'all-time' | 'weekly'; // Define a union type for allowed tabs

const Leaderboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('all-time');

    const leaderboardData: { [key in TabType]: { id: number; name: string; message: string; trees: number; date: string }[] } = {
        'all-time': [
            { id: 1, name: 'Anonymous', message: 'haha', trees: 1, date: '11/16/2024, 10:32:04 AM' },
            { id: 2, name: 'From nephew', message: 'For Uncle Bruce', trees: 11, date: '11/16/2024, 10:11:42 AM' },
            { id: 3, name: 'THE VALLEY SCHOOL KINDERGARTEN', message: 'Yay! Go trees!!', trees: 5, date: '11/16/2024, 7:59:08 AM' },
            { id: 4, name: 'Barbara Rauhuff', message: '', trees: 1, date: '11/16/2024, 6:04:55 AM' },
        ],
        'weekly': [
            { id: 1, name: 'Anonymous', message: 'Just planted a tree!', trees: 2, date: '11/15/2024, 9:15:23 AM' },
            { id: 2, name: 'Nature Lover', message: 'For the planet!', trees: 3, date: '11/14/2024, 5:11:18 PM' },
        ],
    };

    return (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === 'all-time' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('all-time')}
                >
                    All Time
                </button>
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === 'weekly' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('weekly')}
                >
                    Weekly
                </button>
            </div>
            <LeaderboardTab data={leaderboardData[activeTab]} />
        </div>
    );
};

export default Leaderboard;
