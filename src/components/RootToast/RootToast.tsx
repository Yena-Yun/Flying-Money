import { ToastContainer, toast, Flip } from 'react-toastify';

export const RootToast = () => {
  return (
    <ToastContainer
      role='alert'
      position={toast.POSITION.TOP_CENTER}
      autoClose={1000}
      hideProgressBar
      transition={Flip}
      limit={3}
      pauseOnFocusLoss={false}
      theme='light'
    />
  );
};
