import { useDispatch } from 'react-redux';
import { ChangeEvent, DragEvent, useState } from 'react';
import { getCurrentFormattedDate, getGroupDate, parseFormattedDate } from '@/utils/date';
import { ImageData } from '@/types/storage';
import { v4 as uuidv4 } from 'uuid';
import { addImages } from '@/store/images.store';
import { closeModals } from '@/store/modal.store';
import useNotifications from '@/hooks/useNotifications';

const useDragAndDropUpload = () => {
  const {notifyError} = useNotifications();

  const dispatch = useDispatch();

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      notifyError('Wrong file type! File should be an image');
      return;
    }

    const imageURL = URL.createObjectURL(file);
    const img = new Image;

    img.onload = function() {
      const createdAt = getCurrentFormattedDate();
      const {day, month} = parseFormattedDate(createdAt);

      const image: ImageData = {
        id: uuidv4(),
        label: `${day} ${month}`,
        filename: file.name,
        createdAt,
        aspectRatio: img.width / img.height,
        groupDate: getGroupDate(createdAt),
        URL: imageURL,
        downloadURL: imageURL,
        statuses: {
          loaded: true,
          isUploading: true,
        }
      }

      dispatch(addImages({ images: [image] }));
      dispatch(closeModals());
    };

    img.src = imageURL;
  }

  const handleDrop = function(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return {
    handleDrag,
    handleDrop,
    handleChange,
    dragActive,
  }
}

export default useDragAndDropUpload;
