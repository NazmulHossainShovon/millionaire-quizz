/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import { css } from "@emotion/react"; // using this to add hover property support

const triviaStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
};

const questionStyle: React.CSSProperties = {
  width: "80%",
  textAlign: "center",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid white",
  fontSize: "20px",
};

const answersStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};

const answerStyle = {
  width: "40%",
  padding: "10px",
  margin: "0 10px 20px 10px",
  textAlign: "center",
  background: "linear-gradient(#0e0124, #22074d)",
  border: "1px solid white",
  borderRadius: "15px",
  fontWeight: 300,
  fontSize: "20px",
  cursor: "pointer",
  "&:hover": {
    background: "mediumblue",
  },
};

export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [answersBackground, setAnswersBackground] = useState<string>(
    "linear-gradient(#0e0124, #22074d)"
  );
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    // letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    // setTimeout(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);

    // setTimeout(() => {
    delay(5000, () => {
      if (a.correct) {
        // correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
        // setTimeout(() => {
        //   setQuestionNumber((prev) => prev + 1);
        //   setSelectedAnswer(null);
        // }, 1000);
      } else {
        // wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
        // setTimeout(() => {
        //   setTimeOut(true);
        // }, 1000);
      }
      // }, 5000);
    });
  };
  return (
    <div style={triviaStyle}>
      <div style={questionStyle}>{question?.question}</div>
      <div style={answersStyle}>
        {question?.answers.map((a) => (
          <div
            css={answerStyle}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
