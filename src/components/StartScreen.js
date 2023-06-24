const StartScreen = (props) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{props.numQuestion} Question to test your React mastery</h3>
      <button
        onClick={() => props.dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
