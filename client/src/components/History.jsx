import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ENDPOINT } from "../utils/socket";

const History = () => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const onClick = () => {
    setOpen(true);
    axios.get(ENDPOINT + "/history").then((res) => {
      console.log(res.data);
      setHistory(res.data);
    });
  };

  return (
    <div>
      <Button onClick={onClick} style={{ marginBottom: "10px" }}>
        Past Results
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => setOpen(false)}
        open={open}>
        <DialogTitle>History</DialogTitle>
        <DialogContent>
          {history.map((question, index) => (
            <div className="card" key={question + index}>
              <h2>{`Q. ${question.question}`}</h2>
              {Object.keys(question.votes).map((opt, index) => (
                <Card
                  key={opt + index}
                  variant="outlined"
                  style={{ marginBottom: "10px" }}>
                  <div className="flex-between" style={{ padding: "0 20px" }}>
                    <p>{(question.correct == opt ? "✅\t" : "") + opt}</p>
                    <p>{`${(
                      (question.votes[opt] / question.participants) *
                      100
                    ).toFixed(2)}%`}</p>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
