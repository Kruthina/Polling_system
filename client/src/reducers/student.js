import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: sessionStorage.getItem("name") || "",
  timer: 60,
  results: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentName(state, action) {
      state.name = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
});

export const { setStudentName, setTimer, setResults } = studentSlice.actions;
export default studentSlice.reducer;
