import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { savedTagGroupState } from 'recoil/atom';
import { expenseListSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  const setExpenseItemList = useSetRecoilState(expenseListSelector);

  const [savedTagGroup, setSavedTagGroup] = useRecoilState(savedTagGroupState);

  const [value, setValue] = useState('');

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: value }]);

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
          <div className={styles.tagGroup}>
            {savedTagGroup.map(({ id, name }) => {
              return (
                <div
                  key={id}
                  className={styles.tag}
                  onClick={() => {
                    setExpenseItemList(name);
                    setCloseTagPopup();
                  }}
                >
                  {name}
                </div>
              );
            })}
          </div>
          <form onSubmit={handleTagSubmit} className={styles.inputItem}>
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
