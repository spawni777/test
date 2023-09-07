import styles from '@/styles/components/header.module.scss';
import UIContainer from '@/components/ui/UIContainer';
import logoImg from '@/assets/images/logo.png';
import UIButton from '@/components/ui/UIButton';

type Props = {}

const Header = ({}: Props) => {
  return (
    <>
      <UIContainer className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLogo}>
              <img src={logoImg} alt="logo"/>
            </div>
            <div className={styles.headerInfo}>
              12 images stored in keeper
            </div>
          </div>
          <div className={styles.headerBtn}>
            <UIButton
              icon="upload"
              text="Upload image"
              iconColor="#fff"
            />
          </div>
        </header>
      </UIContainer>

      <div className={styles.delimiter} />
    </>
  )
}

export default Header;
