import { Dialog, Fab } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChats, setParticipants } from "../../reducers/participants";
import socket, { ENDPOINT } from "../../utils/socket";
import ChatPopUp from "./ChatPopUp";

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.off("connected").on("connected", (connected) => {
      console.log(connected);
      dispatch(setParticipants(connected));
    });

    const eventHandler = (message) => {
      console.log(message);
      dispatch(setChats(message));
    };
    socket.on("message", eventHandler);
    return () => {
      socket.off("message", eventHandler);
    };
  }, []);

  useEffect(() => {
    axios.get(ENDPOINT + "/participants").then((res) => {
      dispatch(setParticipants(res.data));
    });
  }, []);

  return (
    <div className="chat-button">
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => setShow(false)}
        open={show}>
        <ChatPopUp />
      </Dialog>
      <Fab onClick={() => setShow(!show)}>👥</Fab>
    </div>
  );
};

export default ChatButton;
