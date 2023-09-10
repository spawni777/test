import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from '@/store/images.store';
import modalsReducer from '@/store/modal.store';
import notificationReducer from '@/store/notification.store';

export default configureStore({
  reducer: {
    images: imagesReducer,
    modals: modalsReducer,
    notification: notificationReducer,
  }
})
