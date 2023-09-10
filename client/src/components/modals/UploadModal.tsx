import { useSelector } from 'react-redux';
import { IRootState } from '@/types/storage';
import { CSSTransition } from "react-transition-group";
import styles from '@/styles/modals/uploading.module.scss';
import modalStyles from '@/styles/modals/modal.module.scss';
import icon from '@/assets/images/icons/upload_big.svg';
import useDragAndDropUpload from '@/hooks/useDragAndDropUpload';

const UploadModal = () => {
  const modalIsOpen = useSelector<IRootState, boolean>((state) => state.modals.uploading.isOpen);

  const {
    handleDrag,
    handleDrop,
    handleChange,
    dragActive,
  } = useDragAndDropUpload();

  return (
    <CSSTransition
      in={modalIsOpen}
      timeout={200}
      classNames="fade"
      unmountOnExit
    >
      <div
        className={`${styles.uploading} ${modalStyles.modal}`}
        onDragEnter={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className={`${styles.content} ${dragActive ? styles.dragActive : ''}`}
        >
          <div className={styles.icon}>
            <img src={icon} alt="icon"/>
          </div>
          <div className={styles.title}>
            Upload file
          </div>
          <div className={styles.text}>
            Drop your file here to start uploading
          </div>
        </div>

        <label
          htmlFor="input-file-upload"
          className={styles.inputLabel}
        >
          <input
            id="input-file-upload"
            className={styles.input}
            type="file"
            multiple={false}
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleChange}
          />
        </label>
        { dragActive && (
          <div
            className={styles.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        ) }
      </div>
    </CSSTransition>
  )
}

export default UploadModal;
