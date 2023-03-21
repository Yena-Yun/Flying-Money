import { useRecoilValue } from 'recoil';
import { AOpen, AIndex } from 'recoil/atom';
import { Banner, Header } from 'components/Main';
import { ManageTag, TabMenu } from 'components/TabMenu';
import { AddModal, AllDetail, ByDateDetail, Toast } from 'components/Modal';
import styles from './Home.module.scss';
import { TagPopup } from '~/components/Modal/Add/TagPopup/TagPopup';

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
  const isOpenDeleteTagToast = useRecoilValue(AOpen.isOpenDeleteTagToastState);

  return (
    <>
      {isOpenAddModal && <AddModal />}
      {clickedIndex && isOpenDetailModal && <AllDetail />}
      {clickedItemIndex && isOpenByDateDetailModal && <ByDateDetail />}
      {isOpenTagModal && <ManageTag />}
      {isOpenTagPopup && <TagPopup />}
      {isOpenDeleteTagToast && <Toast role='deleteTag' />}
      {isOpenDeleteTagToast && <Toast role='deleteByAll' />}
      {isOpenDeleteTagToast && <Toast role='deleteByDate' />}

      <div className={styles.container}>
        <Header />
        <div className={styles.innerContainer}>
          <Banner />
          <TabMenu />
        </div>
      </div>
    </>
  );
};
