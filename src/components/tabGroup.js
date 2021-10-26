import React, { Children, useState } from "react";
import PropTypes from 'prop-types';
import Tab from './tab';
import { ifVal } from './components-helpers';
import '../sass/tabGroup.scss';

function TabGroup(props) {
    const [active, setActive] = useState(Children.toArray(props.children)[0]);

    var content, tabs;
    if (Children.count(props.children) === 0) {
        content = [ <h4>No Tabs Found.</h4> ];
    }
    else {
        // Convert Tag elements to buttons and one content div
        tabs = Children.map(props.children, element => {
            if (element.type !== Tab) {
                // Only Tag elements allowed.
                console.error('TabGroup must only contain the Tab element');
                return null;
            }

            const tabActive = element.props.name === active.props.name;
            const theClass = () => 'tab-header' + ifVal(tabActive, ' tab-active', '');

            if (tabActive)
            {
                if (element.props.children) {
                    content = element.props.children;
                }
                else {
                    content = ["Empty Tab"];
                    console.warn('Tab ' + element.props.name + ' is empty');
                }
            }

            return <button
                    data-testid={element.props.name}
                    key={element.props.name}
                    id={element.props.name}
                    name={element.props.name}
                    className={theClass(element)}
                    onClick={() => setActive(element) }
                    active={ifVal(tabActive, 'true', 'false')}
                   >
                        {element.props.name}
                    </button>
        });
    }

    const styles = {};
    if(props?.width) { styles.width = parseInt(props.width); };
    if(props?.height) { styles.height = parseInt(props.height); };
    
    let name = 'tabgroup';
    if(props?.name) { name = props.name };

    return <div name={name} style={styles}>
              <div name='tabGroupHeader'>{tabs}</div>
              <p/>
              <div name='tabContent'>{content}</div>
           </div>;
}

TabGroup.propTypes = {
    name: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    children: function (props, propName, componentName) {
        var error;
        var prop = props[propName];
  
        React.Children.forEach(prop, function (child) {
            if (child.type !== 'Tab') {
                error = new Error('`' + componentName + '` only accepts children of type `Tab`.'
            );
            }
        });
  
        return error;
      }
}

export default TabGroup;
