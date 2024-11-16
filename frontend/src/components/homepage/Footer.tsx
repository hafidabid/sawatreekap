const Footer: React.FC = () => {
    return (
        <footer className="bg-green-600 py-6 px-4 text-white">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex space-x-8 text-xl font-bold">
                    <a href="#" className="hover:underline">FAQ</a>
                    <a href="#" className="hover:underline">Contact Us</a>
                    <a href="#" className="hover:underline">Press Inquiries</a>
                </div>
                <p className="text-center mt-4">© 2024 Sawatreekap. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
