// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(255, 255, 255)",       // White background for light mode
    strokeBorder: "rgb(208, 215, 222)",      // Light gray border
    cardFill: "rgb(255, 255, 255)",          // White card background
    cardStroke: "rgb(208, 215, 222)",        // Card border color
    title: "#d63384",                        // Pink/magenta for headers (darker for contrast)
    textPrimary: "#24292f",                  // Dark gray/black for main text (readable)
    icon: "#e67700",                         // Orange for icons (darker for visibility)
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgba(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgba(225, 228, 232, 0.5)",
    title: "#ff006e",
    textPrimary: "#e0e0e0",
    icon: "#ffd60a",
  },
};

export default colors;