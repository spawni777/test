import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IImagesState, ImageData, ImageStatusName } from '@/types/storage';
import { getGroupDate } from '@/utils/date';

const initialState: IImagesState = {
  groups: {},
  totalNumber: 0,
  statuses: {
    fetched: false,
  },
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setFetched: (state, {payload}: PayloadAction<boolean>) => {
      state.statuses.fetched = payload;
    },
    addImages: (state, {payload}: PayloadAction<{ images: ImageData[], total?: number }>) => {
      const { images, total } = payload;

      images.forEach(imageData => {
        imageData.groupDate  = getGroupDate(imageData.createdAt);

        if (!imageData.statuses) {
          imageData.statuses = {};
        }

        if (state.groups[imageData.groupDate]) {
          state.groups[imageData.groupDate].unshift(imageData);
          return;
        }
        state.groups[imageData.groupDate] = [imageData];
      })

      if (total) {
        state.totalNumber = total;
      } else {
        state.totalNumber += images.length;
      }
    },
    setImageStatus: (state, {payload}: PayloadAction<{groupDate: string, id: number | string; state: boolean; statusName: ImageStatusName}>) => {
      const group = state.groups[payload.groupDate];

      const idx = group.findIndex(image => image.id === payload.id);

      if (!~idx) return;

      group[idx].statuses[payload.statusName] = payload.state;
    },
    updateUploadedImage: (state, {payload}: PayloadAction<{updatedImage: ImageData; previousId: number | string; groupDate: string}>) => {
      const {previousId, updatedImage, groupDate} = payload;

      const image = state.groups[groupDate].find(image => image.id === previousId);

      if (!image) return;

      image.id = updatedImage.id;
      image.label = updatedImage.label;
      image.downloadURL = updatedImage.downloadURL;
    },
    removeImage: (state, {payload}: PayloadAction<{id: number | string; groupDate: string }>) => {
      const {id, groupDate} = payload;

      state.groups[groupDate] = state.groups[groupDate].filter(image => image.id !== id);
      state.totalNumber -= 1;
    }
  }
})

export const {
  setFetched,
  setImageStatus,
  addImages,
  updateUploadedImage,
  removeImage,
} = imagesSlice.actions

export default imagesSlice.reducer
