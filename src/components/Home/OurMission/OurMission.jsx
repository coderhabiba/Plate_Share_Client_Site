import { motion } from 'framer-motion';

const OurMission = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center max-w-[80%] mx-auto py-20">
        <motion.div
          animate={{
            rotate: [0, 360],
            borderRadius: ['1rem', '50%', '100%'], 
          }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="overflow-hidden lg:w-[500px] w-[250px] lg:h-[500px] h-[250px] flex items-center justify-center mx-auto"
        >
          <img
            src="https://i.ibb.co/8g7nDQrF/mission.jpg"
            alt="mission"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div>
          <h2 className="text-4xl elms-font font-extrabold mb-6 bg-linear-to-r from-[#677374] to-[#307A7F] bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-base text-zinc-400">
            To provide our neighbours with access to healthy food by: Promoting
            the benefits of nutrition; building community partnerships; and
            supporting our clients through a variety of life challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
