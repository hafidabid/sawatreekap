import Image from 'next/image';
import {ChevronDoubleDownIcon} from "@heroicons/react/24/outline";

const HeroSection: React.FC = () => {
    return (
        <section className="bg-black text-white text-center py-16">
            <div
                className="bg-cover bg-center bg-no-repeat w-full h-screen justify-center items-center text-white"
                style={{
                    backgroundImage: "url('/tree-illustration.png')",
                }}
            >
                <div className="max-w-3xl mx-auto">
                    <Image className="h-32 w-auto mx-auto mb-8"
                        src="/logo.png"
                        alt="Sawatreekap Logo"
                        width={100}
                        height={100} />
                    <h1 className="text-7xl font-bold"
                        style={{
                            background: 'linear-gradient(90deg, rgba(78,167,46,1) 0%, rgba(197,236,191,1) 38%, rgba(229,255,36,1) 76%, rgba(79,217,159,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >A Greener Future.</h1>
                    <h1 className="text-7xl font-bold mt-4">Sawatreekap.</h1>
                    <p className="text-xl mt-6">
                        Every Tree Planted Helps Combat Climate Change by Leveraging Blockchain for Transparency, Efficiency, and Global Impact. Join Us in Building a Sustainable World, One Tree at a Time.
                    </p>
                    <div className="flex flex-col gap-2 mt-8">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full mr-4"
                        >
                            Get started
                        </button>
                        <button
                            className="flex flex-row w-full items-center justify-center text-white px-6 py-3 rounded-full hover:bg-white hover:bg-gray-500 transition-colors duration-200"
                        >
                            Learn More <ChevronDoubleDownIcon className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
