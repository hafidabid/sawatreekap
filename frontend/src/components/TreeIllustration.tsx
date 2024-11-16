const TreeIllustration: React.FC = () => {
    return (
        <div
            className="bg-black bg-cover bg-center bg-no-repeat w-full h-screen"
            style={{
                backgroundImage: "url('/group.png')",
            }}
        >
            {/* Optional content centered on the background */}
            <div className="flex justify-center items-center h-full">
                {/* Any overlay content can go here */}
            </div>
        </div>
    );
};

export default TreeIllustration;