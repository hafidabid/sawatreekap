interface NFTCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-gray-800 text-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={imageUrl} alt={title} className="w-full h-32 object-cover rounded-md mb-4" />
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
};

export default NFTCard;
