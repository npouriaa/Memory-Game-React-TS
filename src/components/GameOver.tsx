const GameOver = () => {
  return (
    <div className="modal-con">
      <div className="modal">
        <h2 className="game-over">Game over !</h2>
        <p>you ran out of time ):</p>
        <button onClick={() => location.reload()}>Restart</button>
      </div>
    </div>
  );
};

export default GameOver;
