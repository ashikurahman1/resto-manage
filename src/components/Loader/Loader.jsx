import { motion } from 'framer-motion';
import { MdRestaurantMenu } from 'react-icons/md';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-100">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <MdRestaurantMenu size={40} />
      </motion.div>
    </div>
  );
};
export default Loader;
