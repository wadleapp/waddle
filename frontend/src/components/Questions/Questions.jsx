import React, { useEffect, useState } from "react";
import axiosJSONInst from "../../AxiosJSON";
import Question from "./Question";
import { selectUID } from "../../app/reducers/UserSlice";
import { useSelector } from "react-redux";

const Questions = ({ setQuestionModal }) => {
  const uid = useSelector(selectUID);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answer0, setAnswer0] = useState([]);
  const [answer1, setAnswer1] = useState([]);
  const [answer2, setAnswer2] = useState([]);

  useEffect(() => {
    axiosJSONInst
      .get("/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const rand1 = Math.floor(Math.random() * (questions.length - 1));
      const rand2 = Math.floor(Math.random() * (questions.length - 1));
      const rand3 = Math.floor(Math.random() * (questions.length - 1));
      setSelectedQuestions([questions[rand1], questions[rand2], questions[rand3]]);
    }
  }, [questions]);

  const handleSubmit = () => {
    const answers = [answer0, answer1, answer2];
    answers.forEach((answer, i) => {
      const data = {
        qid: selectedQuestions[i].qid,
        uid,
        date: Date.now(),
        values: answer,
      };
      axiosJSONInst
        .post("/responses", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setQuestionModal(false);
  };

  return (
    <div>
      {selectedQuestions && (
        <>
          {selectedQuestions[0] && (
            <Question {...selectedQuestions[0]} answer={answer0} setAnswer={setAnswer0} />
          )}
          {selectedQuestions[1] && (
            <Question {...selectedQuestions[1]} answer={answer1} setAnswer={setAnswer1} />
          )}
          {selectedQuestions[2] && (
            <Question {...selectedQuestions[2]} answer={answer2} setAnswer={setAnswer2} />
          )}
        </>
      )}
      <p className="btn btn-primary--blue-vibrant text-a-c" onClick={handleSubmit}>
        Submit Questions
      </p>
    </div>
  );
};

export default Questions;
