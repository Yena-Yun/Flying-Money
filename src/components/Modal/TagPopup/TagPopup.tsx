import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { savedTagGroupState, itemState } from 'recoil/atom';
import { addTagToItemSelector, toggleTagPopupSelector } from 'recoil/selector';
import { IoIosClose } from 'react-icons/io';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const setAddTagToItem = useSetRecoilState(addTagToItemSelector);
  const setItems = useSetRecoilState(itemState);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(savedTagGroupState);
  const [value, setValue] = useState('');

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: value }]);
    setValue('');
  };

  const handleTagDelete = (id: string, name: string) => {
    setItems((items) =>
      items.filter(({ name: itemName }) => itemName !== name)
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
                      setAddTagToItem(name);
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
              onChange={(e) => setValue(e.target.value)}
              placeholder='태그'
            />
          </form>
        </div>
      </div>
    </>
  );
};
