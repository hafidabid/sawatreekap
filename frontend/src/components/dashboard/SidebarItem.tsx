import { useRouter } from 'next/router';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
    badge?: string;
    children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, path, badge, children }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(path); // Navigate to the specified path
    };

    return (
        <div className="mb-2">
            <div
                className="flex items-center justify-between text-white hover:bg-green-600 p-3 rounded-lg cursor-pointer"
                onClick={handleClick}
            >
                <div className="flex items-center space-x-3">
                    {icon}
                    <span className="text-sm">{label}</span>
                </div>
                {badge && <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1">{badge}</span>}
            </div>
            <div className="pl-8">{children}</div>
        </div>
    );
};

export default SidebarItem;
