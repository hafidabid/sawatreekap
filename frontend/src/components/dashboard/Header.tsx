// components/Header.tsx
import React from 'react';
import { BellIcon, CogIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between bg-gray-800 px-4 py-3 shadow">
            <div className="flex items-center border border-gray-500 rounded-full px-3 py-1">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search (Ctrl+/)"
                    className="bg-transparent rounded-full px-4 py-1 text-gray-300 focus:outline-none"
                />
            </div>
            <div className="flex items-center space-x-4">
                <BellIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
                <CogIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
                <UserIcon className="w-5 h-5 rounded-full text-gray-300 cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
