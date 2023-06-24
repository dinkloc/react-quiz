const FinishScreen = (props) => {
  const percentage = props.point / props.maxPointPossible / 100;
  return (
    <>
      <p className="result">
        You score <strong>{props.point}</strong> out of {props.maxPointPossible}{" "}
        ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Highscore: {props.highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => props.dispatch({ type: "restart" })}
      >
        {" "}
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
