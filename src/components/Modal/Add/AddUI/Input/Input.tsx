import classNames from 'classnames';
import styles from './Input.module.scss';

interface InputProps {
  type?: 'text' | 'number';
  name: string;
  value?: string;
  className?: string;
  placeholder: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => false | void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    // <div className={styles.inputWrap}>
    <input {...props} />
    // </div>
  );
};

Input.defaultProps = {
  type: 'text',
};
