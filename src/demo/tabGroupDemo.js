import React from 'react';
import Tab from '../components/tab';
import TabGroup from '../components/tabGroup';
import PopupInfo from '../components/popupInfo';
import altIcon from '../assets/alt.png';
import '../sass/tabGroup.scss';

const TabGroupDemo = () => {
    return  <TabGroup name='tabgroup' width="500" height="100">
                <Tab name="Cash"><h1>Hello Cash!</h1></Tab>
                <Tab name="Credit Card">
                    <p>Well, credit card. <popup-info img={altIcon}>Ummm... don't steal my card!</popup-info></p>
                </Tab>
                <Tab name="Bitcoin"><h2>Why? <PopupInfo>$63,359.25!</PopupInfo></h2></Tab>
                <Tab name="Empty" />
            </TabGroup>
}

export default TabGroupDemo;
