/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

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
  const [question, setQuestion] = useState({
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [options, setOptions] = useState<string[]>([]);

  function insertAtRandomPosition(str: string, array: string[]) {
    const randomPosition = Math.floor(Math.random() * (array.length + 1));
    array.splice(randomPosition, 0, str);
    return array;
  }

  useEffect(() => {
    // letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber]);
  }, [data, questionNumber]);

  useEffect(() => {
    let fourOptions;
    if (question) {
      fourOptions = insertAtRandomPosition(
        question.correct_answer,
        question.incorrect_answers
      );
    }
    setOptions(fourOptions);
  }, [question]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {};
  return (
    <>
      <div style={triviaStyle}>
        <div style={questionStyle}>{question?.question}</div>
        <div style={answersStyle}>
          {options &&
            options.map((option) => (
              <div
                css={answerStyle}
                onClick={() => !selectedAnswer && handleClick(a)}
              >
                {option}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
