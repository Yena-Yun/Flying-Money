import { Home } from 'pages/Home/Home';
import { RecoilRoot } from 'recoil';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
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
    </>
  );
}

export default App;
