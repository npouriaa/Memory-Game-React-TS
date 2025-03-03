import "../assets/confetti.css"

const Confetti = () => {
  return (
    <div className="confetti">
      {Array.from({ length: 13 }).map((_, index) => (
        <div key={index} className="confetti-piece"></div>
      ))}
    </div>
  );
};

export default Confetti;
