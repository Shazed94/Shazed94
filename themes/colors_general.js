// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(225, 228, 232, 0.1)",  // Semi-transparent overlay   // Фон обводки
    strokeBorder: "rgb(225, 228, 232)",    // Border/outline color       // Цвет обводки
    cardFill: "none",                        // Inner fill of the card     // Заливка карточки
    cardStroke: "rgb(225, 228, 232)",      // Card border color          // Обводка внутри карточки
    title: "#f72585",                        // Header text color          // Цвет заголовка
    textPrimary: "#1a1a2e",                  // Main text color            // Основной текст
    icon: "#ffbe0b",                         // Default icon color         // Цвет иконок)
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgb(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgb(225, 228, 232, 0.5)",
    title: "#ff006e",
    textPrimary: "#e0e0e0",
    icon: "#ffd60a",
  },
};

export default colors;
