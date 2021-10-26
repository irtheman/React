import React, {useState} from "react";
import {convertToArray} from '../components/components-helpers';
import '../sass/menu.scss';
import MenuImg from '../assets/menu.png';

const Menu = ({children}) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="button-menu">
        <img
          src={MenuImg} 
          alt="Menu" 
          className="menu-toggle"
          onClick={() => setOpen(!open)}
        />
        <div
          id="menu"
          className="menu-button-group"
          style={{ display: open ? "inherit" : "none" }}
        >
          {
            convertToArray(children).map((c) => {
                return React.cloneElement(c, {
                    'data-testid':"menu-button", 
                    className: "menu-button",
                    style: undefined,
                    onClick: function (e) {
                        setOpen(false);
                        //eslint-disable-next-line
                        c.props.onClick?.(e);
                    }
                });
            })
          }
        </div>
      </div>
    );
  }
  
  export default Menu;
  