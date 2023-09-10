import { useDispatch, useSelector } from 'react-redux';
import useNotifications from '@/hooks/useNotifications';
import { ImageData, IRootState } from '@/types/storage';
import { useEffect, useState } from 'react';
import { setModalIsOpen } from '@/store/modal.store';
import { updateImageAPI } from '@/api';
import { updateUploadedImage } from '@/store/images.store';

const useEditLabel = () => {
  const dispatch = useDispatch();
  const {notifySuccess, notifyError} = useNotifications();

  const imageData = useSelector<IRootState, ImageData>(({ modals }) => modals.editing.image);
  const modalIsOpen = useSelector<IRootState, boolean>(({ modals }) => modals.editing.isOpen);

  const [updatedLabel, setUpdatedLabel] = useState(imageData.label);
  useEffect(() => {
    setUpdatedLabel(imageData.label);
  }, [imageData.label])

  const closeModal = () => {
    dispatch(setModalIsOpen({modalName: 'editing', isOpen: false}));
  }

  const saveUpdatedLabel = async () => {
    try {
      const {data: {image: updatedImage}} = await updateImageAPI(imageData.id as number, updatedLabel);

      dispatch(updateUploadedImage({
        updatedImage,
        groupDate: imageData.groupDate,
        previousId: imageData.id
      }));

      notifySuccess('Label was updated successfully!');
      closeModal();
    } catch (err) {
      console.log(err);
      notifyError('Something went wrong...');
    }
  }

  return {
    imageData,
    modalIsOpen,
    updatedLabel,
    setUpdatedLabel,
    closeModal,
    saveUpdatedLabel,
  }
}

export default useEditLabel;
