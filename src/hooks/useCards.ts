import { useEffect, useRef, useState } from "react";
import { shuffleCards } from "../helpers/cards";

const useCards = () => {
  const [time, setTime] = useState<number>(60);
  const [complete, setComplete] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const [cards, setCards] = useState(shuffleCards());

  const disabled = useRef(true);
  const prevIndex = useRef(-1);

  useEffect(() => {
    setTimeout(() => {
      setCards((prevCards) =>
        [...prevCards].map((c) => ({ ...c, status: "facedown" }))
      );
      disabled.current = false;
      setInProgress(true);
    }, 2000);
  }, []);

  const updateCardStatus = (indices: number[], status: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        indices.includes(i) ? { ...card, status } : card
      )
    );
  };

  const handleClick = (index: number) => {
    if (disabled.current) return;

    const currCard = cards[index];
    const prevCard = prevIndex.current !== -1 ? cards[prevIndex.current] : null;

    if (currCard.status === "faceup" || currCard.status === "matched") return;

    updateCardStatus([index], "faceup");

    if (!prevCard) {
      prevIndex.current = index;
      return;
    }

    if (currCard.symbol === prevCard.symbol) {
      updateCardStatus([prevIndex.current, index], "matched");
      prevIndex.current = -1; // Reset after a successful match
    } else {
      disabled.current = true;
      setTimeout(() => {
        updateCardStatus([prevIndex.current, index], "facedown");
        disabled.current = false;
        prevIndex.current = -1; // Reset after a mismatch
      }, 600);
    }
  };

  useEffect(() => {
    if (inProgress && !complete) {
      if (time <= 0) {
        setGameOver(true);
        return;
      }

      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [inProgress, time, complete]);

  const handleGameComplete = () => {
    if (cards.every((card) => card.status === "matched")) {
      setComplete(true);
    }
  };

  useEffect(() => {
    handleGameComplete();
  }, [cards]);

  return { cards, handleClick, complete, gameOver, time };
};

export { useCards };
