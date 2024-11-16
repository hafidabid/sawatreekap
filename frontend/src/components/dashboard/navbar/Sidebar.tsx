// components/Navbar/Sidebar.tsx
import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import {
    HomeIcon,
    EnvelopeIcon,
    ChatBubbleBottomCenterTextIcon,
    CalendarIcon,
    DocumentTextIcon,
    UserIcon,
    ShieldCheckIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col p-4">
            <div className="flex items-center justify-center text-2xl font-bold mb-6">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
                Materialize
            </div>
            <SidebarItem icon={<HomeIcon className="w-5 h-5" />} label="Dashboard" badge="New">
                <SidebarSubmenu label="CRM" />
                <SidebarSubmenu label="Analytics" active />
                <SidebarSubmenu label="eCommerce" />
            </SidebarItem>
            <SidebarItem icon={<EnvelopeIcon className="w-5 h-5" />} label="Email" />
            <SidebarItem icon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5" />} label="Chat" />
            <SidebarItem icon={<CalendarIcon className="w-5 h-5" />} label="Calendar" />
            <SidebarItem icon={<DocumentTextIcon className="w-5 h-5" />} label="Invoice" />
            <SidebarItem icon={<UserIcon className="w-5 h-5" />} label="User" />
            <SidebarItem icon={<ShieldCheckIcon className="w-5 h-5" />} label="Roles & Permissions" />
            <SidebarItem icon={<LockClosedIcon className="w-5 h-5" />} label="Auth Pages" />
        </aside>
    );
};

export default Sidebar;
