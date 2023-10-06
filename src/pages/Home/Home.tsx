import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { AOpen, AIndex } from 'recoil/atom';
import { Header } from 'components/Main';
import { ManageTag, TabMenu } from 'components/TabMenu';
import { AddModal, AllDetail, ByDateDetail } from 'components/Modal';
import { TagPopup } from 'components/Modal/Add/AddUI';
import styles from './Home.module.scss';
import { SOpen } from 'recoil/selector';
import classNames from 'classnames';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(AOpen.isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(AOpen.isOpenAllDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(
    AOpen.isOpenByDateDetailModalState
  );
  const isOpenTagModal = useRecoilValue(AOpen.isOpenTagModalState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedListIndexState);
  const isOpenTagPopup = useRecoilValue(AOpen.isOpenTagPopupState);

  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const resetOpenTagPopup = useResetRecoilState(AOpen.isOpenTagPopupState);

  const handleClose = () => {
    // setCloseModal(role);
    resetOpenTagPopup();
  };

  return (
    <>
      {isOpenAddModal && <AddModal />}
      {clickedIndex && isOpenDetailModal && <AllDetail />}
      {clickedItemIndex && isOpenByDateDetailModal && <ByDateDetail />}
      {isOpenTagModal && <ManageTag />}
      {isOpenTagPopup && <TagPopup />}

      {isOpenAddModal ||
        isOpenDetailModal ||
        isOpenByDateDetailModal ||
        isOpenTagModal ||
        (isOpenTagPopup && (
          <div
            className={classNames(
              styles.popupBackground
              // role === 'tagPopup' && styles.tagPopup
            )}
            onClick={handleClose}
          ></div>
        ))}

      <div className={styles.container}>
        <Header />
        <div className={styles.innerContainer}>
          <TabMenu />
        </div>
      </div>
    </>
  );
};
