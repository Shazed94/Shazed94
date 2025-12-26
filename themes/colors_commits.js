// Colors for light and dark themes (Цвета для светлой и темной темы)
const colors = {
  light: {
    fillOverlay: "rgb(225, 228, 232, 0.1)",  // Semi-transparent overlay   // Фон обводки
    strokeBorder: "rgb(225, 228, 232)",    // Border/outline color       // Цвет обводки
    cardFill: "none",                        // Inner fill of the card     // Заливка карточки
    cardStroke: "rgb(225, 228, 232)",      // Card border color          // Обводка внутри карточки
    stat: "#f72585",                         // Color of statistics        // Цвет статистики
    label: "#1a1a2e",                        // Color of labels            // Цвет меток
    date: "#ffbe0b",                         // Color of dates             // Цвет дат
    divider: "#f72585",                      // Color of dividers          // Цвет разделителей
    ring: "#f72585",                         // Ring color                 // Цвет кольца
    fire: "#ffbe0b",                         // Fire icon color            // Цвет иконки огня
    footer: "#586069",                       // Footer color               // Цвет футера
  },
  dark: {
    fillOverlay: "none",
    strokeBorder: "rgb(225, 228, 232, 0.5)",
    cardFill: "none",
    cardStroke: "rgb(225, 228, 232, 0.5)",
    stat: "#ff006e",
    label: "#e0e0e0",
    date: "#ffd60a",
    divider: "#ff006e",
    ring: "#ff006e",
    fire: "#ffd60a",
    footer: "#c9d1d9",
  },
  meta: {
    timeZone: "Europe/Moscow",               // Time zone in the card (Часовой пояс в карточке)
  },
};

export default colors;
