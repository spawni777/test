import styles from '@/styles/components/content/image.module.scss';
import { memo } from 'react';
import { ImageData } from '@/types/storage';
import { CSSTransition } from "react-transition-group";
import downloadIcon from '@/assets/images/icons/download.svg';
import editIcon from '@/assets/images/icons/edit.svg';
import deleteIcon from '@/assets/images/icons/delete.svg';
import useInitImageUpload from '@/hooks/useInitImageUpload';
import { deleteImageAPI } from '@/api';
import { useDispatch } from 'react-redux';
import { removeImage } from '@/store/images.store';
import useNotifications from '@/hooks/useNotifications';
import { setModalIsOpen } from '@/store/modal.store';

const ImageCard = memo((props: ImageData) => {
  const {
    URL: url,
    label,
    groupDate,
    id,
    downloadURL,
    filename
  } = props;

  const {
    uploadedSize,
    totalSize,
    uploadedProgress,
    uploadingIsDone,
  } = useInitImageUpload(props);


  const dispatch = useDispatch();

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

  return (
    <div className={styles.imageData}>
      <div className={styles.imageDataContent}>
        <div className={styles.image}>
          <img src={url} alt="image"/>
        </div>

        <CSSTransition
          in={!uploadingIsDone}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <div className={styles.uploading}>
            <div className={styles.uploadingBar} style={{width: `${uploadedProgress}%`}}/>
            <div className={styles.uploadingContent}>
              <div className={styles.uploadingTitle}>Uploading</div>
              <div className={styles.uploadingProcess}>
                {`${uploadedSize} of ${totalSize}`}
              </div>
            </div>
          </div>
        </CSSTransition>

        {uploadingIsDone && (
          <div className={styles.actions}>
            <div className={styles.actionsContent}>
              {actions.map(action => (
                <div className={styles.action} onClick={action.onClick} key={action.title}>
                  <div className={styles.actionImage}>
                    <img src={action.image} alt="icon"/>
                  </div>
                  <div className={styles.actionTitle}>
                    {action.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!!label.length && (
        <div className={styles.label}>{label}</div>
      )}
    </div>
  )
})

export default ImageCard;
