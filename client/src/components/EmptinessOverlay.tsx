import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/storage';
import { CSSTransition } from "react-transition-group";
import styles from '@/styles/components/emptiness.module.scss';
import UIButton from '@/components/ui/UIButton';
import { setModalIsOpen } from '@/store/modal.store';

const EmptinessOverlay = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector<IRootState, boolean>((state) => state.images.totalNumber === 0 && state.images.statuses.fetched);

  const showUploadModal = () => {
    dispatch(setModalIsOpen({modalName: 'uploading', isOpen: true}));
  }

  return (
    <CSSTransition
      in={modalIsOpen}
      timeout={200}
      classNames="fade"
      unmountOnExit
    >
      <div className={styles.emptiness}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="logo"/>
          </div>
          <div className={styles.title}>
            No images uploaded yet
          </div>
          <div className={styles.text}>
            Upload your first image by drag and dropping the file on the screen or click the button below
          </div>
          <div className={styles.btn}>
            <UIButton
              icon="upload"
              iconColor="#3D293F"
              text="Upload image"
              onClick={showUploadModal}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default EmptinessOverlay;
