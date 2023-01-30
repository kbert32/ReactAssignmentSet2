import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ModContextProvider } from './store/modalShow-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ModContextProvider><App /></ModContextProvider>);
