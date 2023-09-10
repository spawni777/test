import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from '@/types/storage';

const initialState: NotificationState = {
  type: 'success',
  title: 'Success',
  text: 'Image has been uploaded!',
  isOpen: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, {payload}: PayloadAction<NotificationState>) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      })
    },
  }
})

export const {
  setNotification,
} = notificationSlice.actions

export default notificationSlice.reducer;
