import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageData, ModalsState } from '@/types/storage';

const initialState: ModalsState = {
  editing: {
    isOpen: false,
    image: {
      URL: '',
      filename: '',
      downloadURL: '',
      label: '',
      aspectRatio: 0,
      statuses: {},
      groupDate: '',
      id: 0,
      createdAt: '',
    }
  },
  uploading: {isOpen: false},
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalIsOpen(state, {payload}: PayloadAction<{modalName: string, isOpen: boolean}>) {
      state[payload.modalName].isOpen = payload.isOpen;
    },
    closeModals(state) {
      Object.keys(state).forEach(modalName => {
        state[modalName].isOpen = false;
      })
    },
    setEditingModalImage(state, {payload}:PayloadAction<ImageData>) {
      state.editing.image = payload;
    }
  }
})

export const {
  setModalIsOpen,
  closeModals,
  setEditingModalImage,
} = modalsSlice.actions

export default modalsSlice.reducer
