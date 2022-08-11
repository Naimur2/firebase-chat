import {createSlice} from '@reduxjs/toolkit';

const usersState = {
  users: [],
  messages: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState: usersState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  },
});

export const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export default usersReducer;
