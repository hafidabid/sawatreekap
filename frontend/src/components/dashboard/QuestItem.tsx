interface QuestItemProps {
    title: string;
    description: string;
    reward: string;
    status: 'Achieved' | 'In Progress';
}

const QuestItem: React.FC<QuestItemProps> = ({ title, description, reward, status }) => {
    return (
        <div className="p-4 bg-gray-800 rounded-lg border-l-4 
      ${status === 'Achieved' ? 'border-green-500' : 'border-yellow-500'}"
        >
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400 mb-2">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Reward: <span className="text-green-400 font-bold">{reward}</span></span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status === 'Achieved' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default QuestItem;
