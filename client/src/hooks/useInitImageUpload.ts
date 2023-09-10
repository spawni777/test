import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { normalizeSize } from '@/utils/imageSize';
import { uploadImageAPI } from '@/api';
import { setImageStatus, updateUploadedImage } from '@/store/images.store';
import { ImageData } from '@/types/storage';
import useNotifications from '@/hooks/useNotifications';

const useInitImageUpload = ({URL, filename, statuses, id, label, groupDate, aspectRatio}: ImageData) => {
  const {notifyError} = useNotifications();

  const [uploadedProgress, setUploadedProgress] = useState(100);
  const [totalSize, setTotalSize] = useState('');
  const [uploadedSize, setUploadedSize] = useState('');
  const dispatch = useDispatch();

  const uploadImage = async () => {
    try {
      setUploadedProgress(0);

      const response = await fetch(URL);
      const blob = await response.blob();
      const file = new File([blob], filename);
      const formData = new FormData();

      setTotalSize(normalizeSize(file.size));

      formData.append('image', file!);
      formData.append('label', label);
      formData.append('aspectRatio', String(aspectRatio));

      const {data} = await uploadImageAPI(formData, progressEvent => {
        setTotalSize(normalizeSize(progressEvent.total!));
        setUploadedSize(normalizeSize(progressEvent.loaded!));

        const progress = Math.floor((progressEvent.loaded / progressEvent.total!) * 100);
        setUploadedProgress(progress);
        dispatch(setImageStatus({ statusName: 'isUploading', id, groupDate, state: false }));
      });

      dispatch(updateUploadedImage({
        updatedImage: data.image,
        groupDate,
        previousId: id,
      }));
    } catch (err) {
      console.log(err);
      notifyError('Something went wrong. Image was not uploaded...');
    }
  }

  useEffect(() => {
    if (!statuses.isUploading) return;
    uploadImage();
  }, [])

  const uploadingIsDone = uploadedProgress === 100;

  return {
    uploadingIsDone,
    uploadedSize,
    totalSize,
    uploadedProgress,
  }
}

export default useInitImageUpload;
