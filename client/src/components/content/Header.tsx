import styles from '@/styles/components/content/header.module.scss';
import UIContainer from '@/components/ui/UIContainer';
import UIButton from '@/components/ui/UIButton';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/storage';
import { setModalIsOpen } from '@/store/modal.store';

type Props = {}

const Header = ({}: Props) => {
  const imagesFetched = useSelector<IRootState, boolean>(state => state.images.statuses.fetched);
  const imagesTotalNumber = useSelector<IRootState, number>(state => state.images.totalNumber);

  const dispatch = useDispatch();

  const showUploadModal = () => {
    dispatch(setModalIsOpen({modalName: 'uploading', isOpen: true}));
  }

  return (
    <>
      <UIContainer className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLogo}>
              <img src="/logo.png" alt="logo"/>
            </div>
            <div className={styles.headerInfo}>
              {imagesTotalNumber} images stored in keeper
            </div>
          </div>
          <div className={styles.headerBtn}>
            <UIButton
              icon="upload"
              text="Upload image"
              iconColor={imagesFetched ? '#FFF' : '#000'}
              onClick={showUploadModal}
            />
          </div>
        </header>
      </UIContainer>

      <div className={styles.delimiter} />
    </>
  )
}

export default Header;
