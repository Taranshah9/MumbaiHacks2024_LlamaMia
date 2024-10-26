// /* eslint-disable react/prop-types */
// import { Link as ScrollLink, Element } from 'react-scroll';
// import hero from '../../../public/hero3.jpg'; // Ensure the correct path to your image
// import AgriSmartLogo from '../../Leafsvg';

// function Navbar({handleLoginClick}) {
//   return (
//     // <div
//     //   className="relative min-h-screen bg-cover bg-center bg-no-repeat w-full h-full"
//     //   style={{ backgroundImage: `url(${hero})` }}
//     // >
//     //   <header className="absolute top-0 left-0 w-full flex items-center justify-between  bg-black bg-opacity-30 z-10">
//     //     <div><AgriSmartLogo /></div>
//     //     <nav className="flex items-center space-x-8">
//     //       <ul className="flex space-x-6 text-[#faf2e4] text-lg">
//     //         <li><ScrollLink to="home" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Home</ScrollLink></li>
//     //         <li><ScrollLink to="services" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Our Services</ScrollLink></li>
//     //         <li><ScrollLink to="testimonial" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Testimonial</ScrollLink></li>
//     //         <li><ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Pricing</ScrollLink></li>
//     //       </ul>
//     //       <button onClick={handleLoginClick} className="bg-[#f4d8b6] text-[#2a2a2a] rounded-full px-6 py-2 hover:bg-[#faf2e4] transition duration-300">Login</button>
//     //     </nav>
//     //   </header>

//     //   <main className="flex flex-col items-center justify-center min-h-screen text-center text-[#faf2e4]">
//     //     <Element name="home" className="element">
//     //       <div className="max-w-2xl">
//     //         <h1 className="text-4xl lg:text-6xl font-bold mb-6">Empowering Agriculture for a Sustainable Future</h1>
//     //         <p className="text-lg lg:text-xl mb-10">
//     //           Honor the traditions of farming while embracing modern innovations.
//     //           Our platform offers a balanced approach combining time-tested methods
//     //           with cutting-edge technologies to help you achieve optimal results.
//     //         </p>
//     //       </div>
//     //     </Element>
//     //   </main>
//     // </div>
//   );
// }

// export default Navbar;
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Model() {
  const { scene } = useGLTF("/model/scene.gltf");
  const modelRef = useRef();
  const speed = 3;
  const amplitude = 0.5;

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        Math.sin(clock.getElapsedTime() * speed) * amplitude;
    }
  });
  

  return <primitive object={scene} ref={modelRef} scale={0.5} />;
}

function Test() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('hello')
    navigate("/auth");
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-700 via-green-500 to-emerald-200">
      <div className="container mx-auto px-4">
        <nav className="py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold text-white"
            >
              🌾 AgriSmart
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex space-x-4"
            >
             
              <button onClick={handleLoginClick}className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-emerald-100 transition-colors">
                Sign In
              </button>
            </motion.div>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-88px)] gap-12">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                  The Future of Farming
                </h1>
                
                <div className="h-24 flex items-center">
                  <div className="text-xl lg:text-2xl text-emerald-100">
                    <Typewriter
                      options={{
                        strings: [
                          "AI-Powered Crop Management",
                          "Real-time Weather Monitoring",
                          "Smart Irrigation Systems",
                          "Precision Agriculture Tools",
                          "Sustainable Farming Solutions",
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 80,
                        cursor: '|',
                        wrapperClassName: "text-emerald-100",
                        cursorClassName: "text-emerald-200",
                      }}
                    />
                  </div>
                </div>

                <p className="text-emerald-100 text-lg max-w-xl mb-8">
                  Join thousands of farmers worldwide who are revolutionizing 
                  their agricultural practices with cutting-edge technology 
                  and data-driven insights.
                </p>

                
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-emerald-100">Accuracy Rate</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-emerald-100">Active Farms</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">35%</div>
                  <div className="text-emerald-100">Water Saved</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Model Section */}
          <div className="w-full h-[1000px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full rounded-3xl overflow-hidden"
            >
              <Canvas
                camera={{
                  position: [150, 40, -90],
                  fov: 45,
                }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight
                  position={[2, 2, 2]}
                  intensity={1.2}
                  castShadow
                />
                <Model />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2.11}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;