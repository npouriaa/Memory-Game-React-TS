import { useEffect, useRef, useState } from "react";
import { shuffleCards } from "../helpers/cards";

const useCards = () => {
  // 🕒 State to track the remaining time for the game
  const [time, setTime] = useState<number>(60);

  // ✅ State to track if the game is completed
  const [complete, setComplete] = useState<boolean>(false);
  
  // ❌ State to track if the game is over due to timeout
  const [gameOver, setGameOver] = useState<boolean>(false);
  
  // ⏳ State to check if the game is in progress
  const [inProgress, setInProgress] = useState<boolean>(false);

  // 🎴 State to store the shuffled cards
  const [cards, setCards] = useState(shuffleCards());

  // 🔒 Ref to prevent multiple clicks while animations are running
  const disabled = useRef(true);
  
  // 🃏 Ref to store the index of the previously clicked card
  const prevIndex = useRef(-1);

  useEffect(() => {
    // 🔄 Reset game state when the component mounts
    setGameOver(false);
    setComplete(false);
    setInProgress(false);
    setTime(60);

    // 🔄 Hide all cards after 3 seconds and start the game
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((c) => ({ ...c, status: "facedown" }))
      );
      disabled.current = false;
      setInProgress(true);
    }, 3000);
  }, []);

  // 🔄 Function to update the status of selected cards
  const updateCardStatus = (indices: number[], status: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        indices.includes(i) ? { ...card, status } : card
      )
    );
  };

  // 🎯 Function to handle card click logic
  const handleClick = (index: number) => {
    // 🚫 Ignore clicks if the game is over or clicks are temporarily disabled
    if (disabled.current || gameOver) return;

    const currCard = cards[index];
    const prevCard = prevIndex.current !== -1 ? cards[prevIndex.current] : null;

    // 🚫 Ignore clicks on already flipped or matched cards
    if (currCard.status === "faceup" || currCard.status === "matched") return;

    // 🔄 Flip the current card face up
    updateCardStatus([index], "faceup");

    // 🃏 If this is the first card in the pair, store its index and wait for the second selection
    if (!prevCard) {
      prevIndex.current = index;
      return;
    }

    // ✅ If the two selected cards match, mark them as "matched"
    if (currCard.symbol === prevCard.symbol) {
      updateCardStatus([prevIndex.current, index], "matched");
      prevIndex.current = -1; // Reset previous selection after a successful match
    } else {
      // ❌ If the cards don't match, flip them back after a short delay
      disabled.current = true;
      setTimeout(() => {
        updateCardStatus([prevIndex.current, index], "facedown");
        disabled.current = false;
        prevIndex.current = -1; // Reset previous selection after a mismatch
      }, 800);
    }
  };

  // ⏳ Timer logic: Count down time if the game is in progress
  useEffect(() => {
    if (inProgress && !complete) {
      if (time <= 0) {
        setGameOver(true); // ⏳ If time runs out, end the game
        return;
      }

      // 🔄 Decrease time every second
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [inProgress, time, complete]);

  // 🏆 Check if all cards are matched to complete the game
  const handleGameComplete = () => {
    if (cards.every((card) => card.status === "matched")) {
      setComplete(true);
    }
  };

  // 🔄 Run completion check whenever cards change
  useEffect(() => {
    handleGameComplete();
  }, [cards]);

  // 🎮 Return game state and functions for the UI to use
  return { cards, handleClick, complete, gameOver, time };
};

export { useCards };
