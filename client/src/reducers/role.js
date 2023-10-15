import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: null };

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setStudent(state) {
      state.type = "student";
    },
    setTeacher(state) {
      state.type = "teacher";
    },
  },
});

export const { setStudent, setTeacher } = roleSlice.actions;
export default roleSlice.reducer;
