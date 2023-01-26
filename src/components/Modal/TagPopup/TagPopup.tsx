import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { expenseListState, tagGroupState } from 'recoil/atom';
import {
  addTagSelector,
  toggleTagPopupSelector,
  transactionListSelector,
} from 'recoil/selector';
import { Item } from 'types/types';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const setAddTag = useSetRecoilState(addTagSelector);
  const setTagState = useSetRecoilState(addTagSelector);
  const tags = useRecoilValue(tagGroupState);
  const [value, setValue] = useState('');

  const [expenseItemList, setExpenseItemList] =
    useRecoilState<Item[]>(expenseListState);
  const setTransactionList = useSetRecoilState(transactionListSelector);

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddTag(value);
    setValue('');
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setCloseTagPopup()}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.tagGroup}>
              {tags.map(({ id, name }) => (
                <div key={id} className={styles.tag}>
                  {name}
                </div>
              ))}
            </div>
            <form onSubmit={handleTagSubmit} className={styles.inputItem}>
              {expenseItemList.length > 0 &&
                expenseItemList.map(({ id: index }) => (
                  <input
                    key={index}
                    id='title'
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setExpenseItemList(
                        expenseItemList.map((item) =>
                          item.id === index
                            ? {
                                ...item,
                                tag: tags,
                              }
                            : item
                        )
                      );
                    }}
                    placeholder='태그'
                  />
                ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
