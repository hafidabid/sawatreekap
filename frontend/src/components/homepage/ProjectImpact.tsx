// import Image from 'next/image';

import ProjectCard from "./ProjectCard";

const data = [
    {
        region: "Asia",
        projects: [
            {
                country: "China",
                location: "Minquin County",
                treeCount: 25000,
                description: "Working to restore desertified lands and improve local ecology through reforestation.",
                isComplete: false,
            },
            {
                country: "India",
                location: "Cauvery River Basin",
                treeCount: 905439,
                description: "Reviving river basins and combating soil erosion to support sustainable agriculture.",
                isComplete: true,
            },
            {
                country: "Indonesia",
                location: "Biak Island",
                treeCount: 450000,
                description: "Protecting biodiversity and supporting marine ecosystems in the Coral Triangle.",
                isComplete: true,
            },
        ],
    },
];

const ProjectImpact: React.FC = () => {
    return (
        <section className="bg-black items-center justify-between py-10 px-6 md:px-20">
            <div className="text-center text-white py-10">
                <h1 className="text-7xl font-bold"
                    style={{
                        background: 'linear-gradient(90deg, rgba(78,167,46,1) 0%, rgba(197,236,191,1) 38%, rgba(229,255,36,1) 76%, rgba(79,217,159,1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                    Global Reforestation</h1>
                <p className="text-lg mt-4 px-80">
                    Discover where our reforestation efforts are making an impact worldwide.
                </p>
            </div>
            <div className="bg-green-100 rounded-lg p-6 text-center mx-auto max-w-xl mb-10">
                <h2 className="text-3xl font-bold text-green-800">Trees Planted Worldwide</h2>
                <p className="text-lg mt-4 text-black">27 Million / 30 Million+ Goal</p>
                <div className="flex justify-center items-center mt-6 space-x-4">
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="text-4xl text-green-500">🌲</span>
                    ))}
                </div>
                <p className="text-xs text-green-700 mt-4">
                    Follow our progress as we move closer to achieving our reforestation goal.
                </p>
            </div>
            <div className="py-10">
                {data.map((region, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">{region.region}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {region.projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    country={project.country}
                                    location={project.location}
                                    treeCount={project.treeCount}
                                    description={project.description}
                                    isComplete={project.isComplete}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectImpact;