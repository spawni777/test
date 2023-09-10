import { setNotification } from '@/store/notification.store';
import { useDispatch } from 'react-redux';

let notificationTimer: number;

const useNotifications = () => {
  const dispatch = useDispatch();

  const setTimer = () => {
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
      dispatch(setNotification({
        isOpen: false,
      }));
    }, 3000);
  }

  const notifySuccess = (text: string) => {
    dispatch(setNotification({
      isOpen: true,
      title: 'Success,',
      text,
      type: 'success',
    }));

    setTimer();
  }

  const notifyError = (text: string) => {
    dispatch(setNotification({
      isOpen: true,
      title: 'Sorry, but',
      text,
      type: 'error',
    }));

    setTimer();
  }

  const notifyWarning = (text: string) => {
    dispatch(setNotification({
      isOpen: true,
      title: 'Warning!',
      text,
      type: 'warning',
    }));

    setTimer();
  }

  return {
    notifySuccess,
    notifyError,
    notifyWarning
  }
}

export default useNotifications;
