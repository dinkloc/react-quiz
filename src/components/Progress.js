const Progress = (props) => {
  return (
    <header className="progress">
      <progress
        max={props.numQuestion}
        value={props.index + Number(props.answer !== null)}
      />
      <p>
        <strong>
          {props.index + 1} / {props.numQuestion}{" "}
        </strong>{" "}
      </p>
      <p>
        <strong>
          {props.point} / {props.maxPointPossible}
        </strong>{" "}
        points
      </p>
    </header>
  );
};

export default Progress;
