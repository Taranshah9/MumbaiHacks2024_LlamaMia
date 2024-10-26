// import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedLoginBackground = () => {
  return (
    <div className="relative w-full h-screen bg-gray-50">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main Group with hover animation */}
        <motion.g
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {/* Center Circle Group */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path 
              className="transition-all duration-300 hover:fill-[#25ce9e]"
              fill="#ebf0f6" 
              d="M714.82,572.7l4.42-2.71,12.57-4.75,13.71.69,2.21.32,6.29,1.06,3.9-7.09,20.32-12L728.38,510l-2.11-1.36-2-1.8-3.14-2.41V504l-3.56-3.17C689.41,521.86,688.51,551.12,714.82,572.7Z"
            />
          </motion.g>

          {/* Animated Lines */}
          <motion.line
            x1="646.29"
            x2="646.29"
            y1="241.42"
            y2="341.36"
            className="stroke-[#25ce9e] stroke-2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Animated Paths with hover effects */}
          <motion.path
            className="transition-all duration-300 hover:stroke-[#25ce9e]"
            fill="none"
            stroke="#1c3e58"
            strokeWidth="2.5"
            strokeLinejoin="round"
            d="M722.89,331.67c0-18.68-.12-34.83-.12-34.83"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Floating Elements */}
          <motion.g
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <path
              className="transition-all duration-300 hover:fill-[#25ce9e]"
              fill="#ebf0f6"
              d="M650.41,455.22l-6.95-.07-6-2.69-9.12-7.08.36,39.47c26.5,3.2,55.1-.93,76.11-12.4l.39-57.73-49,38.12Z"
            />
          </motion.g>

          {/* Pulsing Elements */}
          <motion.circle
            cx="800.29"
            cy="530.42"
            r="10"
            fill="#25ce9e"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
             transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default AnimatedLoginBackground;