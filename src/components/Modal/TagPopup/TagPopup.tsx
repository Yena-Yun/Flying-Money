import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { IoIosClose } from 'react-icons/io';
import { savedTagGroupState, expenseListState } from 'recoil/atom';
import { expenseListSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const setExpenseItem = useSetRecoilState(expenseListSelector);
  const setExpenseItemList = useSetRecoilState(expenseListState);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(savedTagGroupState);
  const [value, setValue] = useState('');

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: value }]);
    setValue('');
  };

  const handleTagDelete = (id: string, name: string) => {
    setExpenseItemList((expenseItemList) =>
      expenseItemList.filter(({ name: itemName }) => itemName !== name)
    );
    setSavedTagGroup((savedTagGroup) =>
      savedTagGroup.filter(({ id: index }) => index !== id)
    );
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setCloseTagPopup()}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.tagGroup}>
            {savedTagGroup.map(({ id, name }) => {
              return (
                <div key={id} className={styles.tagWrap}>
                  <div
                    className={styles.tag}
                    onClick={() => {
                      setExpenseItem(name);
                      setCloseTagPopup();
                    }}
                  >
                    {name}
                  </div>
                  <div
                    className={styles.deleteTagIcon}
                    onClick={() => handleTagDelete(id, name)}
                  >
                    <IoIosClose />
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleTagSubmit} className={styles.inputForm}>
            <input
              value={value}
              autoFocus
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder='태그'
            />
          </form>
        </div>
      </div>
    </>
  );
};
