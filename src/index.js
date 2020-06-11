import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => {
    let updateBlock = document.getElementById('update-block');
    let updateButton = document.getElementById('update-button');

    updateBlock.classList.add('show');
    updateButton.addEventListener('click', function (e) {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    });
  }
});
