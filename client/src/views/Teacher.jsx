import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket, { ENDPOINT } from "../utils/socket";
import CreatePoll from "./CreatePoll";
import Results from "./Results";

const Teacher = () => {
  const { results } = useSelector((state) => state.student);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(ENDPOINT + "/teacher").then((res) => {
      if (res.data) setShow(true);
      else {
        socket.emit(
          "join",
          {
            role: "teacher",
            user: {
              sid: socket.id,
            },
          },
          (error) => {
            if (error) console.error(error);
          }
        );
        setShow(false);
      }
    });
  }, []);
  if (show)
    return (
      <div>
        <p>Only one teacher allowed at a time</p>
      </div>
    );
  return <div>{results ? <Results /> : <CreatePoll />}</div>;
};

export default Teacher;
