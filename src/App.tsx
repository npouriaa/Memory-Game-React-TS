import "./App.css";
import Card from "./components/Card";
import { useCards } from "./hooks/useCards";
import Confetti from "./components/Confetti";

const App = () => {
  const { cards, handleClick , time , gameOver , complete} = useCards();

  return (
    <div>
      <p>time left : {time}</p>
      {complete && <Confetti />}
      {gameOver && <p>Game over !</p>}
      <h1>Memory game - React & TS</h1>
      <div className="cards-container">
        {cards.map((c, i) => (
          <Card
            key={i}
            onClick={() => handleClick(i)}
            status={c.status}
            symbol={c.symbol}
          />
        ))}
      </div>
      <button onClick={() => location.reload()}>Restart</button>
    </div>
  );
};

export default App;
