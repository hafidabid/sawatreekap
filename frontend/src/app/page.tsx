import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import AboutSection from "@/components/AboutSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import ProjectImpact from "@/components/ProjectImpact";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <LeaderboardSection />
      <ProjectImpact />
      <Footer />
    </div>
  );
};

export default Home;
