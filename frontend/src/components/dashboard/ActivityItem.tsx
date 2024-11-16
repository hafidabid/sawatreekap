// components/Dashboard/ActivityItem.tsx
import React from 'react';
import { DocumentIcon, PlayIcon } from '@heroicons/react/24/outline';

interface ActivityItemProps {
    iconColor: string;
    title: string;
    description: string;
    link?: string;
    linkLabel?: string;
    date: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ iconColor, title, description, link, linkLabel, date }) => {
    return (
        <li className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
                <span className={`w-3 h-3 rounded-full ${iconColor} mt-2`} />
                <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-sm text-gray-400 mb-1">{description}</p>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-400 text-sm hover:underline"
                        >
                            {linkLabel?.includes(".pdf") ? (
                                <DocumentIcon className="w-4 h-4 mr-1" />
                            ) : (
                                <PlayIcon className="w-4 h-4 mr-1" />
                            )}
                            {linkLabel}
                        </a>
                    )}
                </div>
            </div>
            <p className="text-gray-500 text-sm">{date}</p>
        </li>
    );
};

export default ActivityItem;
