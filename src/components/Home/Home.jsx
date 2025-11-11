import Contact from "../Contact/Contact";
import Banner from "./Banner/Banner";
import Community from "./Community/Community";
import HowItWork from "./HowItWork/HowItWork";
import OurMission from "./OurMission/OurMission";
import FeaturedFood from './FeaturedFood/FeaturedFood';


const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedFood/>
      <OurMission/>
      <HowItWork/>
      <Contact />
      <Community/>
    </div>
  );
};

export default Home;