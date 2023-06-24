import { useEffect } from "react";

const Timer = (props) => {
  const mins = Math.floor(props.secondsRemaining / 60);
  const sec = props.secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        props.dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [props.dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}: {sec < 10 && "0"}
      {sec}
    </div>
  );
};

export default Timer;
