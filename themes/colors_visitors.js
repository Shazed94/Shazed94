// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(225, 228, 232, 0.1)",    // Semi-transparent overlay          // Фон обводки
    strokeBorder: "rgb(225, 228, 232)",      // Border/outline color              // Цвет обводки
    cardFill: "none",                          // Inner fill of the card            // Заливка карточки
    cardStroke: "rgb(225, 228, 232)",        // Card border color                 // Обводка внутри карточки
    iconGithub: "#f72585",                     // GitHub Icon Color                 // Цвет иконки GitHub
    titleCards: "#f72585",                     // Card Title Color                  // Цвет заголовка карточки
    contentIcons: "#ffbe0b",                   // Fill color of statistics icons    // Цвет заливки иконок статистики
    contentIconOutline: "#ffbe0b",             // Stats Header Icon Outline         // Обводка иконок заголовков статистики
    headerStatsText: "#FFFFFF",                // Statistics Header Text Color      // Цвет заливки заголовков статистики
    borderHeaderStats: "#f72585",              // Statistic Header Outlines         // Обводка заголовков статистики
    statisticsText: "#1a1a2e",                 // Statistics text color             // Цвет текста статистики
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
