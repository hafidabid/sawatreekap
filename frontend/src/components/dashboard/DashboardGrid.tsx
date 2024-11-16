import DashboardCard from './DashboardCard';
import { EyeIcon, ShoppingBagIcon, CubeIcon, UsersIcon } from '@heroicons/react/24/outline';

const DashboardGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <DashboardCard icon={<EyeIcon className="w-6 h-6 text-gray-400" />} value="$3.456K" label="Total Views" growth="0.43%" growthDirection="up" />
            <DashboardCard icon={<ShoppingBagIcon className="w-6 h-6 text-gray-400" />} value="$45.2K" label="Total Profit" growth="4.35%" growthDirection="up" />
            <DashboardCard icon={<CubeIcon className="w-6 h-6 text-gray-400" />} value="2,450" label="Total Products" growth="2.59%" growthDirection="up" />
            <DashboardCard icon={<UsersIcon className="w-6 h-6 text-gray-400" />} value="3,456" label="Total Users" growth="0.95%" growthDirection="down" />
        </div>
    );
};

export default DashboardGrid;
