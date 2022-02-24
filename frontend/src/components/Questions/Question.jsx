import React from "react";
import { QuestionTypes } from "./QuestionConstants";
import TextField from "../Inputs/TextField";
import Picker from "emoji-picker-react";
import "./Questions.scss";

const Question = ({ type, question, answer, setAnswer }) => {
  const handleEmojiSelect = (_, emoji) => {
    setAnswer((prevAnswer) => [...prevAnswer, emoji.emoji]);
  };

  return (
    <div className="question-component text--black text-a-c">
      <p className="question-text">{question}</p>
      {type === QuestionTypes.keyword ? (
        // TODO: Handle inputting multiple keywords
        <TextField
          type="text"
          placeholder="Enter Your Response"
          fieldValue={answer}
          setValue={(e) => setAnswer([e])}
        />
      ) : (
        <div>
          <p className="text-a-c">{answer}</p>
          <Picker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default Question;
