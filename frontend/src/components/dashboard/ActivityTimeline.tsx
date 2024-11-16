// components/Dashboard/ActivityTimeline.tsx
import React from 'react';
import ActivityItem from './ActivityItem';

const activities = [
    {
        id: 1,
        title: "Planted 10 Trees at Green Park",
        description: "Initiated a new tree planting drive at Green Park to restore green cover.",
        date: "Today",
        iconColor: "bg-green-500",
        link: "https://maps.google.com",
        linkLabel: "View location",
    },
    {
        id: 2,
        title: "Growth Check - Green Park Trees",
        description: "Measured growth rate and health of trees planted last month.",
        date: "Mar 10",
        iconColor: "bg-blue-500",
        link: "/reports/tree-growth-report.pdf",
        linkLabel: "Growth report",
    },
    {
        id: 3,
        title: "Planted 20 Trees at Riverside",
        description: "Another successful planting day, focusing on water retention areas near Riverside.",
        date: "Feb 28",
        iconColor: "bg-green-500",
        link: "https://maps.google.com",
        linkLabel: "View location",
    },
    {
        id: 4,
        title: "First Growth Check - Riverside Trees",
        description: "Initial health and growth assessment after planting at Riverside.",
        date: "Mar 15",
        iconColor: "bg-blue-500",
        link: "/reports/riverside-growth-report.pdf",
        linkLabel: "Growth report",
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
