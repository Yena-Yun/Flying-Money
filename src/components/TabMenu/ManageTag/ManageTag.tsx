import { useRef, FormEvent, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { AMain, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { IoIosClose as DeleteTagIcon } from 'react-icons/io';
import styles from './ManageTag.module.scss';
import { saveToLocalStorage } from '~/utils/hooks/localStorage';

export const ManageTag = () => {
  const tagFormRef = useRef<HTMLFormElement>(null);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(
    AMain.savedTagGroupState
  );
  // const setOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  // const setDeleteTagIndex = useSetRecoilState(AIndex.deleteTagIndexState);

  // const handleDeleteTag = (id: string) => {
  //   setOpenToast('deleteTag');
  //   setDeleteTagIndex(id);
  // };

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
        <h2 className={styles.title}>태그 관리</h2>
        <div className={styles.tagGroup}>
          {savedTagGroup.length > 0 ? (
            <>
              {savedTagGroup.map(({ id, name }) => {
                return (
                  <div key={id} className={styles.tagWrap}>
                    {/* <div className={styles.tag} onClick={() => handleDeleteTag(id)}> */}
                    <div className={styles.tag}>{name}</div>
                    {/* <div className={styles.deleteTagIcon}>
                  <DeleteTagIcon />
                </div> */}
                  </div>
                );
              })}
            </>
          ) : (
            <p className={styles.addNewTagGuide}>
              등록하신 태그는 새 항목 등록 시 사용할 수 있어요!
            </p>
          )}
        </div>
        {/* {savedTagGroup.length > 0 && (
          <p className={styles.tagDeleteGuide}>태그를 삭제하려면 클릭하세요.</p>
        )} */}
        <form
          className={styles.inputForm}
          ref={tagFormRef}
          onSubmit={handleSubmitTag}
        >
          <input name='tag' placeholder='새 태그 등록' autoFocus />
        </form>
      </ModalLayout>
    </>
  );
};
