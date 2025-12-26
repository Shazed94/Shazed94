// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(255, 255, 255)",         // White background for light mode
    strokeBorder: "rgb(208, 215, 222)",        // Light gray border
    cardFill: "rgb(255, 255, 255)",            // White card background
    cardStroke: "rgb(208, 215, 222)",          // Card border color
    iconGithub: "#d63384",                     // Pink/magenta GitHub Icon (darker for contrast)
    titleCards: "#d63384",                     // Pink/magenta Card Title (darker for contrast)
    contentIcons: "#e67700",                   // Orange for statistics icons (darker)
    contentIconOutline: "#e67700",             // Orange Stats Icon Outline (darker)
    headerStatsText: "#24292f",                // Dark text for header stats (readable on white)
    borderHeaderStats: "#d63384",              // Pink/magenta Statistic Header Outlines
    statisticsText: "#24292f",                 // Dark gray/black for statistics text (readable)
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgb(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgb(225, 228, 232, 0.5)",
    iconGithub: "#ff006e",
    titleCards: "#ff006e",
    contentIcons: "#ffd60a",
    contentIconOutline: "#ffd60a",
    headerStatsText: "#1a1a2e",
    borderHeaderStats: "#ff006e",
    statisticsText: "#e0e0e0",
  },
};

export default colors;