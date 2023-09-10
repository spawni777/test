import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalName, ModalsState } from '@/types/storage';

const modals: ModalName[] = ['uploading', 'editing'];
const initialState: ModalsState = modals.reduce((acc: ModalsState, modalName: ModalName) => {
  acc[modalName] = {
    isOpen: false,
  };

  return acc;
}, {} as ModalsState);

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalIsOpen(state, {payload}: PayloadAction<{modalName: ModalName, isOpen: boolean}>) {
      state[payload.modalName].isOpen = payload.isOpen;
    },
    closeModals(state) {
      modals.forEach(modalName => {
        state[modalName].isOpen = false;
      })
    },
  }
})

export const {
  setModalIsOpen,
  closeModals
} = modalsSlice.actions

export default modalsSlice.reducer
