interface ProjectCardProps {
    country: string;
    location?: string;
    treeCount: number;
    description: string;
    isComplete: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ country, location, treeCount, description, isComplete }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6 relative max-w-lg mx-auto">
            {isComplete && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-sm font-bold px-4 py-1 rounded-bl-lg">
                    COMPLETE
                </div>
            )}
            <h3 className="text-2xl font-bold text-blue-900">{country}</h3>
            {location && <p className="text-sm text-gray-500">{location}</p>}
            <p className="text-lg font-semibold text-green-700 mt-2">{treeCount.toLocaleString()} TREES</p>
            <p className="text-gray-700 mt-4">{description}</p>
        </div>
    );
};

export default ProjectCard;