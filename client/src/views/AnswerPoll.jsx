import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressWithLabel from "../components/CPLabel";
import NavBar from "../components/NavBar";
import { setResults } from "../reducers/student";
import socket from "../utils/socket";
import Results from "./Results";

const AnswerPoll = () => {
  const [question, setQuestion] = useState(null);
  const { results } = useSelector((state) => state.student);
  const [value, setValue] = useState(-1);
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    intervalId && clearInterval(intervalId);
    dispatch(setResults(true));
    socket.emit(
      "submit-answer",
      value === -1 ? "Not answered" : question.options[value],
      (error) => {
        if (error) console.error(error);
      }
    );
    setValue(-1);
  };

  useEffect(() => {
    socket.on("question", (payload) => {
      // console.log(payload, question);
      setQuestion(payload);
      setTimer(payload.timer || 60);
      dispatch(setResults(false));
    });
  }, []);

  useEffect(() => {
    if (!question) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setIntervalId(interval);

    return () => interval && clearInterval(interval);
  }, [question]);

  useEffect(() => {
    if (timer === 0) {
      console.log(intervalId);
      intervalId && clearInterval(intervalId);
      onSubmit();
    }
  }, [timer]);

  if (!question)
    return (
      <div className="selection">
        <h2>Waiting for teacher to ask a question...</h2>
      </div>
    );
  return results ? (
    <Results />
  ) : (
    <div>
      <NavBar title={"Select correct option and submit"}>
        <CircularProgressWithLabel
          value={(timer / question.timer) * 100 || 100}
          label={timer}
        />
      </NavBar>
      <div className="poll">
        <h2>{`Q. ${question.question}`}</h2>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}>
          {question.options.map((val, index) => (
            <FormControlLabel
              key={val + index}
              value={index}
              control={<Radio />}
              label={val}
            />
          ))}
        </RadioGroup>
        <div style={{ marginTop: "20px" }}>
          <Button
            disabled={value === -1}
            variant="contained"
            onClick={() => {
              onSubmit();
            }}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPoll;
