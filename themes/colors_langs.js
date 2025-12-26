// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(255, 255, 255)",          // White background for light mode
    strokeBorder: "rgb(208, 215, 222)",         // Light gray border
    cardFill: "rgb(255, 255, 255)",             // White card background
    cardStroke: "rgb(208, 215, 222)",           // Card border color
    title: "#d63384",                           // Pink/magenta for header (darker for contrast)
    lang: "#24292f",                            // Dark gray/black for language text (readable)
    percent: "#57606a",                         // Medium gray for percentages
    progressBar: "#e1e4e8",                     // Light gray progress bar background
    progressItemOutline: "rgb(208, 215, 222)",  // Light gray progress bar element outline
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgba(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgba(225, 228, 232, 0.5)",
    title: "#ff006e",
    lang: "#e0e0e0",
    percent: "#a8b2d1",
    progressBar: "rgba(110, 118, 129, 0.4)",
    progressItemOutline: "#393f47",
  },
};

export default colors;