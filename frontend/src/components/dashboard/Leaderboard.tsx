import React, { useEffect, useState } from 'react';
import LeaderboardTab from './LeaderboardTab';

type TabType = 'all-time' | 'weekly';

interface LeaderboardItem {
    id: number;
    name: string;
    message: string;
    trees: number;
    date: string;
}

const Leaderboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('all-time');
    const [leaderboardData, setLeaderboardData] = useState<{ [key in TabType]: LeaderboardItem[] }>({
        'all-time': [],
        'weekly': []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://sawatreekap-api.anak-kabupaten.my.id/rank');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                const allTimeData = result.data.map((item: any, index: number) => ({
                    id: index + 1,
                    name: item.address,
                    message: "Achievement message here",
                    trees: item.amount,
                    date: new Date().toLocaleString()
                }));

                const weeklyData = allTimeData.slice(0, 5); // Example of using the top 5 entries for weekly data

                setLeaderboardData({
                    'all-time': allTimeData,
                    'weekly': weeklyData
                });
            } catch (error) {
                setError((error as Error).message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

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
