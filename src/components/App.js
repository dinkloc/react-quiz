import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
const SEC_PER_QUESTION = 30;
const intitalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "restart":
      return { ...intitalState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action Unknown");
  }
};
const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, intitalState);
  const numQuestion = questions.length > 0 ? questions.length : 0;
  const maxPointPossible = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(
    () =>
      async function () {
        try {
          const res = await fetch("http://localhost:8000/questions");
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed" });
        }
      },
    []
  );
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestion={numQuestion}
              index={index}
              point={points}
              maxPointPossible={maxPointPossible}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestion={numQuestion}
                index={index}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPointPossible={maxPointPossible}
            point={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
