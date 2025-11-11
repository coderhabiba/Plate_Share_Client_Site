import Contact from "../Contact/Contact";
import Banner from "./Banner/Banner";
import Community from "./Community/Community";
import HowItWork from "./HowItWork/HowItWork";
import OurMission from "./OurMission/OurMission";


const Home = () => {
  return (
    <div>
      <Banner />
      <OurMission/>
      <HowItWork/>
      <Contact />
      <Community/>
    </div>
  );
};

export default Home;