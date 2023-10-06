import { useRef, FormEvent, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { AMain, AIndex } from 'recoil/atom';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { saveToLocalStorage } from 'utils/hooks/localStorage';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
import styles from './ManageTag.module.scss';

export const ManageTag = () => {
  const tagFormRef = useRef<HTMLFormElement>(null);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(
    AMain.savedTagGroupState
  );
  const setDeleteTagIndex = useSetRecoilState(AIndex.deleteTagIndexState);

  const handleDeleteTag = (id: string) => {
    setSavedTagGroup(savedTagGroup.filter((tag) => tag.id !== id));
    setDeleteTagIndex(id);
  };

  const handleSubmitTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tag = formData.get('tag') as string;

    if (!tag) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: tag }]);

    if (tagFormRef.current) {
      tagFormRef.current.reset();
    }
  };

  useEffect(() => {
    saveToLocalStorage('savedTagGroup', savedTagGroup);
  }, [savedTagGroup]);

  return (
    <>
      <ModalLayout role='tagModal'>
        <h3 className={styles.title}>태그 관리</h3>
        <div className={styles.tagGroup}>
          {savedTagGroup.length > 0 ? (
            <>
              {savedTagGroup.map(({ id, name }) => (
                <div key={id} className={styles.tagWrap}>
                  <span>{name}</span>
                  <div className={styles.deleteTagButton}>
                    <GrFormClose onClick={() => handleDeleteTag(id)} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className={styles.addNewTagGuide}>
              등록하신 태그는 새 항목 등록 시 사용하실 수 있어요!
            </p>
          )}
        </div>
        <form
          className={styles.inputForm}
          ref={tagFormRef}
          onSubmit={handleSubmitTag}
        >
          <input
            name='tag'
            placeholder='엔터를 눌러 새 태그를 등록하세요.'
            autoFocus
          />
        </form>
      </ModalLayout>
    </>
  );
};
