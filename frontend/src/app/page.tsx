"use client";

import {WagmiProvider} from "wagmi";
import Header from "@/components/homepage/Header";
import HeroSection from "@/components/homepage/HeroSection";
import AboutSection from "@/components/homepage/AboutSection";
import LeaderboardSection from "@/components/homepage/LeaderboardSection";
import ProjectImpact from "@/components/homepage/ProjectImpact";
import Footer from "@/components/homepage/Footer";

const Home: React.FC = () => {
    return (
        <div>
            <Header/>
            <HeroSection/>
            <AboutSection/>
            <LeaderboardSection/>
            <ProjectImpact/>
            <Footer/>
        </div>
    );
};

export default Home;
