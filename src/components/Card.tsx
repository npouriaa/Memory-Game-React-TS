import { MouseEventHandler } from "react";

type CardProps = {
  symbol: string;
  status: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ symbol, status, onClick }: CardProps) => {
  return (
    <button
      key={`card-${status}`}
      onClick={onClick}
      className={`card animate__animated  ${
        status === "matched" ? "animate__tada" : "animate__flipInY"
      } ${
        status === "facedown"
          ? "facedown-card"
          : status === "faceup"
          ? "faceup-card"
          : "matched-card"
      }`}
    >
      {status === "facedown" ? "?" : symbol}
    </button>
  );
};

export default Card;
