import Image from 'next/image';

const AboutSection: React.FC = () => {
    return (
        <section className="bg-black flex flex-col md:flex-row items-center justify-between py-10 mb-36 px-6 md:px-20">
            <div className="text-white max-w-lg ml-36">
                <h1 className="text-7xl font-bold mb-4">What is Sawatreekap?</h1>
                <p className="text-xl">
                    Sawatreekap is a blockchain-powered platform that empowers individuals and organizations
                    to combat climate change. By planting trees and supporting environmental projects, users
                    can actively reduce carbon emissions and help restore ecosystems.
                </p>
            </div>
            <div className="flex justify-center items-center mr-36">
                <Image
                    src="/tree-painting-illustration.png"
                    alt="Tree Planting Illustration"
                    className="w-80 max-w-full"
                    width={1000}
                    height={1000}
                />
            </div>
        </section>
    );
};

export default AboutSection;