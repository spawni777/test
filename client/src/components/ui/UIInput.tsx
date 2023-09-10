import styles from '@/styles/components/ui/ui-input.module.scss'
import { ChangeEvent } from 'react';

type Props = {
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UIInput = ({placeholder = '', maxLength = 100, value = '', onChange}: Props) => {
  return (
    <input
      ref={(instance) => {instance?.focus()}}
      className={styles.input}
      type="text"
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
    />
  )
}

export default UIInput;
