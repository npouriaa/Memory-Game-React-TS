export const symbols: string[] = [
  "🧠",
  "🦋",
  "👻",
  "🚀",
  "❤️‍🔥",
  "👨‍💻",
  "🎈",
  "🍕",
  "👑",
  "💎",
];

export const shuffleCards = () => {
  return [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol) => ({ symbol, status: "faceup" }));
};
