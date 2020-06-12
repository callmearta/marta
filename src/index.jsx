import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: (registration) => {
    const updateBlock = document.getElementById('update-block');
    const updateButton = document.getElementById('update-button');

    updateBlock.classList.add('show');
    updateButton.addEventListener('click', () => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    });
  },
});
