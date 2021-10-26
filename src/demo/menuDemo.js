import React from 'react';
import Menu from '../components/menu';

const MenuDemo = () =>
    <Menu>
        <button key="a" onClick={() => alert("Item 1")}>
            Item 1
        </button>
        <div key="a" onClick={() => alert("Item 2")}>
            Item 2
        </div>
        <span key="a" onClick={() => alert("Item 3")}>
            Item 3
        </span>
        <a key="b" href="#anchor">
            Item 4
        </a>
    </Menu>

export default MenuDemo;
