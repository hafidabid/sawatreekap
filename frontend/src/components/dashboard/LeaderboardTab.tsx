// components/Leaderboard/LeaderboardTab.tsx
import React from 'react';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardTabProps {
    data: { id: number; name: string; message: string; trees: number; date: string }[];
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ data }) => {
    return (
        <ul className="space-y-4">
            {data.map((item) => (
                <LeaderboardItem key={item.id} {...item} />
            ))}
        </ul>
    );
};

export default LeaderboardTab;
