interface SidebarSubmenuProps {
    label: string;
    active?: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ label, active = false }) => {
    return (
        <div
            className={`text-sm text-gray-400 hover:text-white cursor-pointer py-1 ${active ? 'text-blue-400' : ''
                }`}
        >
            {label}
        </div>
    );
};

export default SidebarSubmenu;
