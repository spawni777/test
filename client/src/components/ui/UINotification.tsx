import styles from '@/styles/components/ui/ui-notification.module.scss';
import { CSSTransition } from "react-transition-group";
import { useSelector } from 'react-redux';
import { IRootState, NotificationState } from '@/types/storage';

const UINotification = () => {
  const notification = useSelector<IRootState, NotificationState>(({ notification }) => notification);

  let notificationColorClass: string;

  switch (notification.type) {
    case 'success':
      notificationColorClass = styles.success;
      break;
    case 'error':
      notificationColorClass = styles.error;
      break;
    default:
      notificationColorClass = styles.warning;
  }

  return (
    <CSSTransition
      in={notification.isOpen}
      timeout={200}
      classNames="notification"
      unmountOnExit
    >
      <div className={styles.notification}>
        <div className={`${styles.title} ${notificationColorClass}`}>
          {notification.title}
        </div>
        <div className={styles.text}>
          {notification.text}
        </div>
      </div>
    </CSSTransition>
  )
}

export default UINotification;
