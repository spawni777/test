import styles from '@/styles/components/ui/ui-button.module.scss';
import ButtonIcon from '@/components/ButtonIcon';

type Props = {
  icon: 'upload' | 'check' | 'cross';
  iconColor: `#${string}`;
  text: string;
  onClick: () => void;
}

const UIButton = ({icon, text, iconColor, onClick}: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={styles.icon}>
        <ButtonIcon
          icon={icon}
          iconColor={iconColor}
        />
      </div>
      <div className={styles.text}>{text}</div>
    </button>
  )
}


export default UIButton;
