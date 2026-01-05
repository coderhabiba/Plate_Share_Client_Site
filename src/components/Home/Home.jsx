import Contact from "../Contact/Contact";
import Banner from "./Banner/Banner";
import Community from "./Community/Community";
import HowItWork from "./HowItWork/HowItWork";
import OurMission from "./OurMission/OurMission";
import FeaturedFood from './FeaturedFood/FeaturedFood';
import FoodCategories from "./FoodCategories/FoodCategories";
import Testimonials from "./Testimonials/Testimonials";
import { FaQ } from "react-icons/fa6";
import Newsletter from "./NewsLetter/Newsletter";


const Home = () => {
  return (
    <div>
      <Banner />
      <FoodCategories/>
      <FeaturedFood/>
      <OurMission/>
      <HowItWork/>
      <Community />
      <Testimonials />
      <FaQ />
      <Contact />
      <Newsletter/>
    </div>
  );
};

export default Home;