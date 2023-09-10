import styles from '@/styles/components/ui/ui-container.module.scss';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
  className?: string;
};

const UIContainer = ({children, className = ''}: Props) => {
  return <div className={`${styles.uiContainer} ${className}`}>
    {children}
  </div>
}

export default UIContainer;
