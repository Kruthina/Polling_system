import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  teacher: null,
  chats: [],
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setParticipants(state, action) {
      const { students, teacher } = action.payload;
      state.students = students;
      state.teacher = teacher;
    },
    setChats(state, action) {
      const chat = action.payload;
      let chats = state.chats;
      chats.push(chat);
      state.chats = chats;
    },
  },
});

export const { setParticipants, setChats } = participantsSlice.actions;
export default participantsSlice.reducer;
