import React from 'react';
import SidebarItem from './SidebarItem';
import {
    HomeIcon,
    GiftIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-gray-300 min-h-screen flex flex-col p-4">
            <div className="flex items-center justify-center text-l mb-6 text-green-600">
                <img src="/logo_no_title.png" alt="Logo" className="w-8 h-8 mr-2" />
                Sawatreekap
            </div>
            <SidebarItem icon={<HomeIcon className="w-5 h-5" />} label="Dashboard" path="/dashboard" />
            <SidebarItem icon={<ClipboardDocumentListIcon className="w-5 h-5" />} label="Quest" path="/dashboard/quest" />
            <SidebarItem icon={<GiftIcon className="w-5 h-5" />} label="Achievement" path="/dashboard/achievement" />
            <SidebarItem icon={<ChartBarIcon className="w-5 h-5" />} label="Leaderboard" path="/dashboard/leaderboard" />
            <SidebarItem icon={<BuildingStorefrontIcon className="w-5 h-5" />} label="Market Place" path="/dashboard/marketplace" />
        </aside>
    );
};

export default Sidebar;
