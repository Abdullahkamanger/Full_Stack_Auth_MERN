 // eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const pageVariants = {
  initial: { 
    opacity: 0, 
    x: 15, 
    filter: "blur(5px)",
  },
  animate: { 
 opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
   opacity: 0, 
    x: -15, // Reduced distance
    filter: "blur(5px)",
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  // We keep the entrance values (opacity/scale) active DURING the shake
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4 }
  }
};

const AnimatedPage = ({ children, isError }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      // Use the 'animate' variant by default, but trigger 'shake' when isError is true
      animate={isError ? "shake" : "animate"}
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;