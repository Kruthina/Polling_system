import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStudentName } from "../reducers/student";
import socket from "../utils/socket";
import AnswerPoll from "./AnswerPoll";
import Results from "./Results";

const Name = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="selection">
      <TextField
        label="Name"
        placeholder="Enter your name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Button
          variant="contained"
          onClick={() => {
            sessionStorage.setItem("name", name);
            dispatch(setStudentName(name));
          }}>
          Continue
        </Button>
      </div>
    </div>
  );
};

const Student = () => {
  const { name } = useSelector((state) => state.student);
  const { type } = useSelector((state) => state.role);
  useEffect(() => {
    if (name) {
      socket.emit(
        "join",
        {
          role: type,
          user: {
            sid: socket.id,
            name,
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [name]);

  useEffect(() => {
    socket.off("kick").on("kick", () => {
      alert("You have been kicked out");
      window.location.reload();
    });
  }, []);

  return name ? <AnswerPoll /> : <Name />;
};

export default Student;
