import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";

const Participants = () => {
  const { students, teacher } = useSelector((state) => state.participants);
  const { type } = useSelector((state) => state.role);

  const kick = (sid) => {
    socket.emit("kick", sid, (error) => {
      if (error) console.error(error);
    });
  };

  return (
    <div>
      <List subheader={<ListSubheader>Teacher</ListSubheader>}>
        {teacher && (
          <ListItem>
            <ListItemText primary="Teacher" />
          </ListItem>
        )}
      </List>
      <List subheader={<ListSubheader>Students</ListSubheader>}>
        {students.length > 0 &&
          students.map((student) => (
            <ListItem key={student.sid}>
              <ListItemText
                primary={student.sid === socket.id ? "You" : student.name}
              />
              {type === "teacher" && (
                <Button onClick={() => kick(student.sid)}>Kick</Button>
              )}
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default Participants;
