import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { RootToast } from 'components/RootToast/RootToast';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <RootToast />
  </StrictMode>
);
