import LeaderboardItem from "./LeaderboardItem";

const data = [
    { username: 'Anonymous', message: 'haha', treeCount: 1, date: '11/16/2024, 10:32:04 AM' },
    { username: 'From nephew', message: 'For Uncle Bruce', treeCount: 11, date: '11/16/2024, 10:11:42 AM' },
    { username: 'THE VALLEY SCHOOL KINDERGARTEN', message: 'Yay! Go trees!!', treeCount: 5, date: '11/16/2024, 7:59:08 AM' },
    { username: 'Barbara Rauhuff', message: '', treeCount: 1, date: '11/16/2024, 6:04:55 AM' },
];

const LeaderboardSection: React.FC = () => {
    return (
        <section className="py-8">
            <h1 className="text-7xl font-bold text-center text-green-500 mb-6">Leaderboard</h1>
            <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="focus:outline-none"
                    />
                    <svg
                        className="w-4 h-4 text-gray-500 ml-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 20l-5.6-5.6a8 8 0 10-1.4 1.4L20 21zM8 14a6 6 0 110-12 6 6 0 010 12z" />
                    </svg>
                </div>
                <button className="bg-white text-gray-800 font-semibold rounded-full px-4 py-2 shadow">Most Recent</button>
                <button className="bg-gray-200 text-gray-600 font-semibold rounded-full px-4 py-2 shadow">Most Trees</button>
            </div>
            <div>
                {data.map((item, index) => (
                    <LeaderboardItem
                        key={index}
                        username={item.username}
                        message={item.message}
                        treeCount={item.treeCount}
                        date={item.date}
                    />
                ))}
            </div>
        </section>
    );
};

export default LeaderboardSection;