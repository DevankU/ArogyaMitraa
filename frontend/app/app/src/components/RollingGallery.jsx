import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import "./RollingGallery.css";
import GradientText from './GradientText'; // Ensure this is correctly imported

const IMGS = [
  "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://www.myamericannurse.com/wp-content/uploads/2020/07/Screen-Shot-2020-09-02-at-11.35.08-AM-616x420.png",
  "https://cybertex.edu/wp-content/uploads/2024/02/ai-and-nursing.jpg",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://brainpod.ai/wp-content/uploads/2022/08/12-980x574.png",
  "https://image.slidesdocs.com/responsive-images/background/artificial-intelligence-robot-sci-fi-powerpoint-background_8ddae6ac2f__960_540.jpg",
  "https://www.rionegro.com.ar/wp-content/uploads/2023/05/inteligencia-artificial-1523758.jpg",
  "https://itbiztoday.com/wp-content/uploads/2021/04/futuristic-robot-artificial-intelligence-concept_31965-4087.jpg",
  "https://img.freepik.com/premium-photo/care-nurse-assisting-patient-generative-ai_94628-4196.jpg",
  "https://www.dr-hempel-network.com/wp-content/uploads/2018/06/Is-the-medical-profession-really-ready-for-a-technology-driven-evolution.jpg",
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  images = IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  useEffect(() => {
    if (autoplay) {
      const autoplayInterval = setInterval(() => {
        const currentRotation = rotation.get();
        controls.start({
          rotateY: currentRotation - 1,
          transition: { duration: 0.05, ease: "linear" },
        });
        rotation.set(currentRotation - 1);
      }, 50);

      autoplayRef.current = autoplayInterval;
      return () => clearInterval(autoplayInterval);
    }
  }, [autoplay, rotation, controls]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const autoplayInterval = setInterval(() => {
        const currentRotation = rotation.get();
        controls.start({
          rotateY: currentRotation - 1,
          transition: { duration: 0.05, ease: "linear" },
        });
        rotation.set(currentRotation - 1);
      }, 50);

      autoplayRef.current = autoplayInterval;
    }
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-header">
        <GradientText>
          <span>Our Gallery</span> 
        </GradientText>
      </div>
      <div className="gallery-container">
        <div className="gallery-content">
          <motion.div
            drag="x"
            className="gallery-track"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {images.map((url, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                }}
              >
                <img src={url} alt="gallery" className="gallery-img" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RollingGallery;