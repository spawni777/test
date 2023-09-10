import { useDispatch } from 'react-redux';
import useNotifications from '@/hooks/useNotifications';
import { deleteImageAPI } from '@/api';
import { removeImage } from '@/store/images.store';
import downloadIcon from '@/assets/images/icons/download.svg';
import editIcon from '@/assets/images/icons/edit.svg';
import { setEditingModalImage, setModalIsOpen } from '@/store/modal.store';
import deleteIcon from '@/assets/images/icons/delete.svg';
import { ImageData } from '@/types/storage';

const useImageActions = (props: ImageData) => {
  const dispatch = useDispatch();
  const {
    groupDate,
    id,
    downloadURL,
    filename,
  } = props;


  const downloadImage = (downloadURL: string, filename: string) => {
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const {notifySuccess, notifyError} = useNotifications();

  const deleteImage = async (id: string | number) => {
    try {
      if (typeof id === 'number') {
        await deleteImageAPI(id);
      }
      dispatch(removeImage({id,  groupDate}));
    } catch (err) {
      console.log(err);
    }
  }

  const actions = [
    {
      image: downloadIcon,
      title: 'Download',
      onClick: () => {
        downloadImage(downloadURL, filename);
      },
    },
    {
      image: editIcon,
      title: 'Edit label',
      onClick: () => {
        dispatch(setEditingModalImage(props));
        dispatch(setModalIsOpen({modalName: 'editing', isOpen: true}))
      },
    },
    {
      image: deleteIcon,
      title: 'Delete',
      onClick: async () => {
        try {
          await deleteImage(id);
          notifySuccess('Image was deleted');
        } catch (err) {
          notifyError('Something goes wrong. Reload the page.');
        }
      },
    },
  ];

  return actions;
}

export default useImageActions;
