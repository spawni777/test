import styles from '@/styles/modals/editing.module.scss'
import modalStyles from '@/styles/modals/modal.module.scss';
import { CSSTransition } from "react-transition-group";
import UIButton from '@/components/ui/UIButton';
import UIContainer from '@/components/ui/UIContainer';
import UIInput from '@/components/ui/UIInput';
import useEditLabel from '@/hooks/useEditLabel';

const EditingModal = () => {
  const {
    imageData,
    modalIsOpen,
    updatedLabel,
    setUpdatedLabel,
    closeModal,
    saveUpdatedLabel,
  } = useEditLabel(); 

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
        <UIContainer className={styles.container}>
          <>
            <div className={styles.content}>
              <div className={styles.title}>
                Set custom label
              </div>
              <div className={styles.image}>
                <img src={imageData.URL} alt="image"/>
              </div>
              <div className={styles.input}>
                <UIInput
                  maxLength={100}
                  value={updatedLabel}
                  placeholder="Type new label"
                  onChange={(event) => setUpdatedLabel(event.target.value)}
                />
              </div>
              <div className={styles.subtitle}>
                100 chars max
              </div>
              <div className={styles.saveBtn}>
                <UIButton
                  icon="check"
                  iconColor="#000"
                  text="Save"
                  onClick={saveUpdatedLabel}
                />
              </div>
            </div>

            <div className={styles.closeBtn}>
              <UIButton
                onClick={closeModal}
                icon="cross"
                iconColor="#000"
                text="Close editor"
              />
            </div>
          </>
        </UIContainer>
      </div>
    </CSSTransition>
  )
}

export default EditingModal
