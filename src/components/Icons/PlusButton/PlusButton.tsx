import classNames from 'classnames';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './PlusButton.module.scss';

type PlusButtonType = {
  size?: string;
};

export const PlusButton = ({ size }: PlusButtonType) => {
  return (
    <div className={classNames(styles.addItem, size === 'lg' && styles.large)}>
      <HiOutlinePlusCircle />
    </div>
  );
};
