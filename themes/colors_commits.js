// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(255, 255, 255)",       // White background for light mode
    strokeBorder: "rgb(208, 215, 222)",      // Light gray border
    cardFill: "rgb(255, 255, 255)",          // White card background
    cardStroke: "rgb(208, 215, 222)",        // Light gray card border
    stat: "#d63384",                          // Pink/magenta for stats (darker for contrast)
    label: "#24292f",                         // Dark gray/black for labels (readable)
    date: "#e67700",                          // Orange for dates (darker for visibility)
    divider: "#d63384",                       // Pink/magenta divider
    ring: "#d63384",                          // Pink/magenta ring
    fire: "#e67700",                          // Orange fire icon
    footer: "#57606a",                        // Gray footer text
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgba(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgba(225, 228, 232, 0.5)",
    stat: "#ff006e",
    label: "#e0e0e0",
    date: "#ffd60a",
    divider: "#ff006e",
    ring: "#ff006e",
    fire: "#ffd60a",
    footer: "#c9d1d9",
  },
  meta: {
    timeZone: "Asia/Dhaka",                  // Bangladesh timezone (UTC+6)
  },
};

export default colors;