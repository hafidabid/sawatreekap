import QuestItem from './QuestItem';

const quests = [
    {
        id: 1,
        title: 'Plant 10 Trees',
        description: 'Help improve air quality and promote biodiversity by planting 10 trees in your neighborhood.',
        reward: 'Tree NFT - Bronze',
        status: 'Achieved' as 'Achieved', // Type assertion
    },
    {
        id: 2,
        title: 'Plant 50 Trees',
        description: 'Contribute to the greening of urban spaces by planting 50 trees in city parks or along streets.',
        reward: 'Tree NFT - Silver',
        status: 'In Progress' as 'In Progress', // Type assertion
    },
];

const QuestTab: React.FC = () => {
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
