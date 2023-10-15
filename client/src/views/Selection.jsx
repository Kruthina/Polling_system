import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setStudent, setTeacher } from "../reducers/role";

const Selection = () => {
  const dispatch = useDispatch();
  return (
    <div className="selection">
      <h2>Select what type of user are you?</h2>
      <div className="button-bar">
        <Button
          size="large"
          variant="contained"
          onClick={() => dispatch(setStudent())}>
          I am a student
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => dispatch(setTeacher())}>
          I am a teacher
        </Button>
      </div>
    </div>
  );
};

export default Selection;
