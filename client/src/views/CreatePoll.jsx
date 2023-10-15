import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import History from "../components/History";
import NavBar from "../components/NavBar";
import { setResults } from "../reducers/student";
import socket from "../utils/socket";

const CreatePoll = () => {
  const [options, setOptions] = useState([]);
  const [newOpt, setNewOpt] = useState("");
  const [correct, setCorrect] = useState(-1);
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(60);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    const question = {
      question: value,
      options,
      correct: options[correct],
      timer: parseInt(timer),
    };
    socket.emit("submit-question", question, (error) => {
      if (error) console.error(error);
    });
  };

  return (
    <div>
      <NavBar title="Create Poll" />
      <div className="poll">
        <History />
        <TextField
          id="outlined-multiline-flexible"
          label="Enter question"
          placeholder="Enter question"
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
        />
        <RadioGroup
          style={{
            width: "fit-content",
            padding: "20px 0",
          }}
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}>
          {options.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>
                    <span style={{ marginLeft: "30px" }}>Is correct?</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {options.map((val, index) => (
                  <tr key={`${val}-${index}`}>
                    <td>{val}</td>
                    <td>
                      <FormControlLabel
                        style={{ marginLeft: "20px" }}
                        value={index}
                        control={<Radio />}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder="Option"
              value={newOpt}
              onChange={(e) => setNewOpt(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!newOpt) return;
                setOptions((prev) => [...prev, newOpt]);
                setNewOpt("");
              }}>
              Add
            </Button>
          </div>
        </RadioGroup>
        <div className="flex-between">
          <div>
            <TextField
              placeholder="Maximum Time (seconds)"
              label="Maximum Time (seconds)"
              value={timer}
              type="number"
              onChange={(e) => setTimer(e.target.value)}
            />
          </div>
          <Button
            disabled={!value.trim() || correct === -1}
            variant="contained"
            onClick={() => {
              onSubmit();
              dispatch(setResults(true));
            }}>
            Ask question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
