import React, { useState, useMemo, useEffect, useContext } from "react";
import Timer from "../components/Timer.jsx";
import Trivia from "../components/Trivia.jsx";
import { MyContext } from "../context/MyContext.js";
import { BounceLoader } from "react-spinners";

const mainStyle: React.CSSProperties = {
  width: "75%",
  display: "flex",
  flexDirection: "column",
};

const pyramidStyle: React.CSSProperties = {
  width: "25%",
  backgroundColor: "#020230",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quizContainerStyle: React.CSSProperties = {
  display: "flex",
};

const topStyle: React.CSSProperties = {
  height: "50%",
  marginTop: "60px",
  position: "relative",
};

const timerStyle: React.CSSProperties = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  border: "5px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  bottom: "10px",
  left: "80px",
  fontSize: "30px",
  fontWeight: 700,
};

const bottomStyle: React.CSSProperties = {
  height: "50%",
  marginTop: "50px",
};

const loadingContainer: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  border: "1px solid red",
  width: "75%",
};

export default function Quiz() {
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [earned, setEarned] = useState("$ 0");
  const { userName } = useContext(MyContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=15&type=multiple"
    );
    const questions = await response.json();
    setData(questions.results);
  };

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={quizContainerStyle}>
      {loading && (
        <div style={loadingContainer}>
          <BounceLoader color="#36d7b7" />
        </div>
      )}
      {!loading && (
        <div style={mainStyle}>
          {timeOut ? (
            <h1 className="endText">You earned: {earned}</h1>
          ) : (
            <>
              <div style={topStyle}>
                <div style={timerStyle}>
                  <Timer
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                  />
                </div>
              </div>
              <div style={bottomStyle}>
                <Trivia
                  data={data}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setTimeOut={setTimeOut}
                />
              </div>
            </>
          )}
        </div>
      )}

      <div style={pyramidStyle}>
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
