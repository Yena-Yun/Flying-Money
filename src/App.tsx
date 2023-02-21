import { Home } from 'pages/Home/Home';
import { RecoilRoot } from 'recoil';
import { RootToast } from 'components/RootToast/RootToast';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
      <RootToast />
    </>
  );
}

export default App;
