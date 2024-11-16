// import Image from 'next/image';

interface LeaderboardItemProps {
    username: string;
    message: string;
    treeCount: number;
    date: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ username, message, treeCount, date }) => {
    return (
        <div className="flex items-center bg-white rounded-lg shadow p-4 mb-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-4">
                {/* <Image src="/logo.png" alt="Tree Icon" className="w-8 h-8"
                    width={1000}
                    height={1000} /> */}
            </div>
            <div className="flex-1">
                <h3 className="text-blue-900 font-bold">{username}</h3>
                <p className="text-gray-600">{message}</p>
            </div>
            <div className="text-center">
                <span className="bg-green-200 text-green-800 font-semibold py-1 px-3 rounded-full">{treeCount} {treeCount > 1 ? 'trees' : 'tree'}</span>
                <p className="text-gray-500 text-xs mt-1">{date}</p>
            </div>
        </div>
    );
};

export default LeaderboardItem;
