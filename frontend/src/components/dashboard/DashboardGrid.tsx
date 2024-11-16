import DashboardCard from './DashboardCard';
import { CurrencyDollarIcon, CloudIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const DashboardGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <DashboardCard
                icon={<GlobeAltIcon className="w-6 h-6 text-gray-400" />}
                value="1,234"
                label="Total Trees Planted"
                growth="5.6%"
                growthDirection="up"
            />
            <DashboardCard
                icon={<CloudIcon className="w-6 h-6 text-gray-400" />}
                value="3,456 kg"
                label="Total Carbon Offset"
                growth="3.2%"
                growthDirection="up"
            />
            <DashboardCard
                icon={<CurrencyDollarIcon className="w-6 h-6 text-gray-400" />}
                value="$789"
                label="Total Carbon Credits Earned"
                growth="2.1%"
                growthDirection="up"
            />
        </div>
    );
};

export default DashboardGrid;
