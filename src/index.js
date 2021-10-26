import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ToastDemo from './demo/toastDemo';
import TabGroupDemo from './demo/tabGroupDemo';
import MenuDemo from './demo/menuDemo';
import SearchBoxDemo from './demo/searchBoxDemo';
import './customElements/popupInfo';
import './sass/index.scss';


ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1 id='#anchor'>TabGroup and popup-info</h1>
      <TabGroupDemo />
    </div>
    <p/>
    <div>
      <h1>Toast</h1>
      <ToastDemo />
    </div>
    <div>
      <h1>Menu</h1>
      <MenuDemo />
    </div>
    <div>
      <h1>Search</h1>
      <SearchBoxDemo />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
//reportWebVitals(console.log);
reportWebVitals();

/*
    // s-tab needs to add it's children to the Tab
    // Need to figure out how to add s-tabgroup children to TabGroup
    <s-tabgroup name='tabgroup' width="500" height="100">
      <s-tab name="Cash"><h1>Hello Cash!</h1></s-tab>
      <s-tab name="Credit Card">
        <p>Well, credit card. <popup-info img="/images/alt.png">Ummm... don't steal my card!</popup-info></p>
      </s-tab>
      <s-tab name="Bitcoin"><h2>Why?</h2></s-tab>
      <s-tab name="Empty" />
    </s-tabgroup>
*/
