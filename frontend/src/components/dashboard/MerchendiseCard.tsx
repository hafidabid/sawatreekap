interface MerchandiseCardProps {
    name: string;
    description: string;
    tokensRequired: number;
    imageUrl: string;
}

const MerchandiseCard: React.FC<MerchandiseCardProps> = ({ name, description, tokensRequired, imageUrl }) => {
    const handleClaim = () => {
        // Add functionality for claiming merchandise here
        alert(`Claiming ${name} for ${tokensRequired} tokens!`);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h4 className="text-lg font-semibold text-white">{name}</h4>
            <p className="text-sm text-gray-400 mb-2">{description}</p>
            <p className="text-sm text-green-400 font-bold">Requires {tokensRequired} tokens</p>
            <button
                onClick={handleClaim}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors w-full"
            >
                Claim
            </button>
        </div>
    );
};

export default MerchandiseCard;
