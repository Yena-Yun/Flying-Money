import classNames from 'classnames';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './PlusButton.module.scss';

interface PlusButtonProp {
  size?: string;
}

export const PlusButton = ({ size }: PlusButtonProp) => {
  return (
    <div className={classNames(styles.addItem, size === 'lg' && styles.large)}>
      <HiOutlinePlusCircle />
    </div>
  );
};
