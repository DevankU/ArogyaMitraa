import { motion } from "framer-motion";
import CountUp from "react-countup";
import GradientText from './GradientText';

export function ProductDescription() {
  const stats = [
    { label: "Availability", value: "24/7", isNumber: false },
    { label: "Accuracy", value: 84, suffix: "%", isNumber: true },
    { label: "Users", value: 1, suffix: "+", isNumber: true },
  ];

  const statsVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const statItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="product-description">
      <div className="product-container">
        <motion.div
          className="product-content"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>
            <GradientText>
              Revolutionizing Healthcare Access
            </GradientText>
          </h2>
          <p>
            ArogyaMitra is an AI-powered healthcare assistant designed to provide immediate medical guidance and
            support. Our platform combines advanced artificial intelligence with medical expertise to deliver
            personalized healthcare solutions accessible to everyone, anytime, anywhere.
          </p>
          <p>
            Whether you're experiencing symptoms and need quick advice, seeking information about medications, or
            looking for preventive healthcare tips, ArogyaMitra is your trusted companion for all health-related
            concerns.
          </p>
          <motion.div
            className="product-stats"
            initial="hidden"
            animate="show"
            variants={statsVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                variants={statItemVariants}
              >
                <span className="stat-number">
                  {stat.isNumber ? (
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="product-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="image-container">
            <div className="glow-effect"></div>
            <video className="rounded-video" autoPlay loop muted playsInline>
              <source src="/IMG_0458.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
      
    </section>
    
  );
}