import Contact from "../Contact/Contact";
import Banner from "./Banner/Banner";
import Community from "./Community/Community";
import HowItWork from "./HowItWork/HowItWork";


const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWork/>
      <Contact />
      <Community/>
    </div>
  );
};

export default Home;