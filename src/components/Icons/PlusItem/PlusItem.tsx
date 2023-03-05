import classNames from 'classnames';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './PlusItem.module.scss';

type PlusItemType = {
  size?: string;
};

export const PlusItem = ({ size }: PlusItemType) => {
  return (
    <div className={classNames(styles.addItem, size === 'lg' && styles.large)}>
      <HiOutlinePlusCircle />
    </div>
  );
};
