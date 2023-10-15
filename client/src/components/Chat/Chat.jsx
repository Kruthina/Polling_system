import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";

const Chat = () => {
  const [value, setValue] = useState("");
  const { chats } = useSelector((state) => state.participants);
  const { type } = useSelector((state) => state.role);
  const { name } = useSelector((state) => state.student);

  const send = () => {
    if (!value.trim()) return;
    socket.emit("message", {
      msg: value,
      name: type === "student" ? name : "Teacher",
      sid: socket.id,
    });
    setValue("");
  };
  return (
    <div className="chat">
      <div className="chat-window">
        {chats.map((chat, index) => (
          <div key={chat.sid + index} className="message">
            <Typography variant="caption">{chat.name}</Typography>
            <Typography>{chat.msg}</Typography>
          </div>
        ))}
      </div>
      <div className="chat-bar">
        <TextField
          fullWidth
          placeholder="Write message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button disabled={type === "student" ? !name : false} onClick={send}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
