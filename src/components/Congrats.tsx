import Confetti from "./Confetti";

const Congrats = () => {
  return (
    <>
      <Confetti />
      <div className="modal-con">
        <div className="modal">
          <h2 className="congrats">congratulations 🎉</h2>
          <p>You won !</p>
          <button onClick={() => location.reload()}>Restart</button>
        </div>
      </div>
    </>
  );
};

export default Congrats;
