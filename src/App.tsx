import "./App.css";
import Card from "./components/Card";
import { useCards } from "./hooks/useCards";
import GameOver from "./components/GameOver";
import Congrats from "./components/Congrats";

const App = () => {
  const { cards, handleClick, time, gameOver, complete } = useCards();

  return (
    <div className="container">
      {gameOver && <GameOver />}
      {complete && <Congrats />}
      <h1 className="title text-primary-color">Memory game cards - React + TS</h1>
      <p>Time Left : {time} sec</p>
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
      <button className="restart" onClick={() => location.reload()}>Restart</button>
      <p>© made by <a href="https://www.linkedin.com/in/npouriaa" target="_blank">npouriaa</a></p>
    </div>
  );
};

export default App;
