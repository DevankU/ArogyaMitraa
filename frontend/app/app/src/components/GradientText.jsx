// GradientText.jsx
import "./GradientText.css";

export default function GradientText({
  children,
  className = "",
  colors = ["#FFFFFF", "#3B82F6", "#10B981", "#3B82F6", "#FFFFFF"],
  animationSpeed = 3, // Faster animation speed (2 seconds)
  showBorder = false,
  textShadow = "0 2px 4px rgba(0,0,0,0.5)", // Subtle shadow for readability
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