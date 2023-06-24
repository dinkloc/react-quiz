const Options = (props) => {
  const hasAnswered = props.answer !== null;
  return (
    <div className="options">
      {props.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === props.answer ? "answer" : ""
          } ${
            hasAnswered
              ? index === props.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => props.dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
