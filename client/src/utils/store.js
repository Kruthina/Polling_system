import { configureStore } from "@reduxjs/toolkit";
import participants from "../reducers/participants";
import role from "../reducers/role";
import student from "../reducers/student";

export default configureStore({
  reducer: {
    role: role,
    student: student,
    participants: participants,
  },
});
