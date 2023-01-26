import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  clickedTagPopupIndexState,
  expenseListState,
  savedTagGroupState,
} from 'recoil/atom';
import { toggleTagPopupSelector } from 'recoil/selector';
import { Item } from 'types/types';
import uuid4 from 'uuid4';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  const [expenseItemList, setExpenseItemList] =
    useRecoilState<Item[]>(expenseListState);

  const [savedTagGroup, setSavedTagGroup] = useRecoilState(savedTagGroupState);

  const [clickedTagPopupIndex, setClickedTagPopupIndex] = useRecoilState(
    clickedTagPopupIndexState
  );

  const [value, setValue] = useState('');

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setAddTag(value);
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
          <div className={styles.mainContainer}>
            {savedTagGroup.map(({ id, name }) => (
              <div key={id} className={styles.tagGroup}>
                <div
                  key={id}
                  className={styles.tag}
                  onClick={() =>
                    setExpenseItemList(
                      expenseItemList.map((item) =>
                        item.id === clickedTagPopupIndex
                          ? { ...item, tag: savedTagGroup }
                          : item
                      )
                    )
                  }
                >
                  {name}
                </div>
              </div>
            ))}
            <form onSubmit={handleTagSubmit} className={styles.inputItem}>
              {expenseItemList.length > 0 &&
                expenseItemList.map(({ id: index }) => (
                  <input
                    key={index}
                    id='title'
                    value={value}
                    autoFocus
                    onChange={(e) => {
                      setValue(e.target.value);
                      setExpenseItemList(
                        expenseItemList.map((item) =>
                          item.id === index
                            ? {
                                ...item,
                                tag: savedTagGroup,
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
