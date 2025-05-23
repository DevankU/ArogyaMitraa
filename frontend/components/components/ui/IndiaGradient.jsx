// GradientText.jsx
import "./GradientText.css";

export default function InidaGradient({
  children,
  className = "",
  colors = [
    "#FF671F", // Saffron (top strip - deep, vibrant)
    "#FFFFFF", // White (middle strip)
    "#046A38", // India green (bottom strip - rich and bold)
    "#FF671F", // Navy blue (Ashoka Chakra accent)
    "#FFFFFF"  // Fade back to white
  ],
  
  animationSpeed = 3, // Faster animation speed (2 seconds)
  showBorder = false,
  textShadow = "0 2px 4px ", // Subtle shadow for readability
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
    textShadow,
  };

  return (
    <span className={`animated-gradient-text ${className}`}>
      {showBorder && <span className="gradient-overlay" style={gradientStyle}></span>}
      <span className="text-content" style={gradientStyle}>{children}</span>
    </span>
  );
}