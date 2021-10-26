import React, {useState} from 'react';
import { trigger } from '../components/components-helpers';
import Toast from '../components/toast';
import '../sass/toast.scss';
import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/error.svg';
import infoIcon from '../assets/info.svg';
import warningIcon from '../assets/warning.svg';
import altIcon from '../assets/alt.png';

const ToastDemo = () => {
  const [toastList, setToastList] = useState([]);
  
  const TOAST_BUTTON_PROPS = [
    {
      id: 1,
      type: 'success',
      className: 'success',
      label: 'Success'
    },
    {
      id: 2,
      type: 'danger',
      className: 'danger',
      label: 'Danger'
    },
    {
      id: 3,
      type: 'info',
      className: 'info',
      label: 'Info'
    },
    {
      id: 4,
      type: 'warning',
      className: 'warning',
      label: 'Warning'
    },
  ];

  const showToast = type => {
    const id = Math.floor((Math.random() * 101) + 1);
    let toastProperties = null;

    switch(type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: 'This is a success toast component',
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: 'This is a error toast component',
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: 'This is an info toast component',
          backgroundColor: '#5bc0de',
          icon: infoIcon
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;
      default: {
        setToastList([]);
      }
    }

   setToastList([...toastList, toastProperties]);
  }

  return <div className='toast-buttons'>
          {
            TOAST_BUTTON_PROPS.map(e => 
              <button 
                key={e.id}
                className={e.className}
                onClick={() => showToast(e.type)}
              >
                {e.label}
              </button>
            )
          }
          <button key="999" style={{backgroundColor: '#800080'}} onClick={() => {
            const test = {
              id: 999,
              title: 'Triggered',
              description: 'Triggered with no state change.',
              backgroundColor: '#800080',
              icon: altIcon
            };

            trigger('showToast:click', test);
          }}>
            Tigger Toast
          </button>

          <Toast 
            toastList={toastList} 
            position={'bottom-left'} 
            autoDelete={true} 
            autoDeleteTime={3000}
          />
        </div>
}

export default ToastDemo;