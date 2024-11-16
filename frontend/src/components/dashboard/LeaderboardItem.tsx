interface LeaderboardItemProps {
    name: string;
    message: string;
    trees: number;
    date: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ name, message, trees, date }) => {
    return (
        <li className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div>
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="text-sm text-gray-400">{message}</p>
            </div>
            <div className="text-center">
                <span className="text-green-400 font-bold">{trees} {trees === 1 ? 'tree' : 'trees'}</span>
                <p className="text-gray-500 text-xs">{date}</p>
            </div>
        </li>
    );
};

export default LeaderboardItem;
