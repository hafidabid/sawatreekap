import QuestItem from './QuestItem';

interface Quest {
    id: number;
    title: string;
    description: string;
    reward: string;
    status: 'Achieved' | 'In Progress';
}

interface QuestTabProps {
    quests: Quest[];
}

const QuestTab: React.FC<QuestTabProps> = ({ quests }) => {
    return (
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="space-y-6">
                {quests.map((quest) => (
                    <QuestItem key={quest.id} {...quest} />
                ))}
            </div>
        </div>
    );
};

export default QuestTab;
