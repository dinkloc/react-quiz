import Options from "./Options";
const Question = (props) => {
  return (
    <div>
      <h4>{props.question.question}</h4>
      <Options
        options={props.question.options}
        dispatch={props.dispatch}
        answer={props.answer}
        correctOption={props.question.correctOption}
      />
    </div>
  );
};

export default Question;
