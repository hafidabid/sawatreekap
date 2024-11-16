// components/Dashboard/ActivityTimeline.tsx
import React from 'react';
import ActivityItem from './ActivityItem';

const activities = [
    {
        id: 1,
        iconColor: "bg-red-500",
        title: "Create youtube video for next product",
        description: "Product introduction and details video",
        link: "https://www.youtube.com/channel/UCuryo5s0CW4aP83itLjidZg",
        linkLabel: "www.youtube.com/channel/UCuryo5s0CW4aP83itLjidZg",
        date: "Tomorrow",
    },
    {
        id: 2,
        iconColor: "bg-blue-500",
        title: "Received payment from USA client",
        description: "Received payment $1,490 for banking ios app",
        date: "January 18",
    },
    {
        id: 3,
        iconColor: "bg-teal-500",
        title: "Meeting with Joseph Morgan for next project",
        description: "Meeting Video call on zoom at 9pm",
        link: "/presentation.pdf",
        linkLabel: "presentation.pdf",
        date: "April 23",
    },
];

const ActivityTimeline: React.FC = () => {
    return (
        <div className="bg-gray-800 text-gray-300 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-6">Activity Timeline</h2>
            <ul className="space-y-6">
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} {...activity} />
                ))}
            </ul>
        </div>
    );
};

export default ActivityTimeline;
