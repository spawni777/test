import styles from '@/styles/modals/editing.module.scss'
import modalStyles from '@/styles/modals/modal.module.scss';
import { CSSTransition } from "react-transition-group";
import { useSelector } from 'react-redux';
import { IRootState } from '@/types/storage';

const EditingModal = () => {
  const modalIsOpen = useSelector<IRootState, boolean>((state) => state.modals.editing.isOpen);

  return (
    <CSSTransition
      in={modalIsOpen}
      timeout={200}
      classNames="fade"
      unmountOnExit
    >
      <div
        className={`${styles.editing} ${modalStyles.modal}`}
      >
        EDIT
      </div>
    </CSSTransition>
  )
}

export default EditingModal
