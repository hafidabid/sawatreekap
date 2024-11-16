const SellTokenSection: React.FC = () => {
    const handleSellTokens = () => {
        // Add functionality for selling tokens here
        alert('Token sale feature coming soon!');
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-green-300 mb-2">Sell Tokens</h3>
            <p className="text-sm text-gray-400 mb-4">Exchange your tokens for cash by selling them to us.</p>
            <button
                onClick={handleSellTokens}
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
                Sell Tokens
            </button>
        </div>
    );
};

export default SellTokenSection;
