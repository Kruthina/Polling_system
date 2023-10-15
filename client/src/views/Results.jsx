import { Button, Card, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../components/NavBar";
import { setResults } from "../reducers/student";
import socket, { ENDPOINT } from "../utils/socket";

const Results = () => {
  const { type } = useSelector((state) => state.role);
  const [question, setQuestion] = useState(null);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(ENDPOINT + "/results")
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    socket.on("results", (payload) => {
      setQuestion((prev) => ({ ...prev, ...payload }));
      console.log(payload);
      if (payload.participants === payload.total) {
        setDone(true);
      }
    });
  }, []);

  if (!question)
    return (
      <div className="selection">
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  return (
    <div>
      <NavBar title="Polling results" />
      <div className="selection">
        <h2>{`Q. ${question.question}`}</h2>
        {Object.keys(question.votes).map((opt, index) => (
          <Card
            key={opt + index}
            variant="outlined"
            style={{ marginBottom: "10px" }}>
            <div className="flex-between" style={{ padding: "0 20px" }}>
              <p>{opt}</p>
              <p>{`${(
                (question.votes[opt] / question.participants) *
                100
              ).toFixed(2)}%`}</p>
            </div>
          </Card>
        ))}
        <div style={{ marginTop: "20px" }}>
          {type === "teacher" ? (
            <Button
              variant="contained"
              disabled={!done}
              onClick={() => {
                dispatch(setResults(false));
              }}>
              Ask another question
            </Button>
          ) : (
            <p>
              {done
                ? "Waiting for another question..."
                : "Waiting for poll to complete..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
