import { Children } from "react";
import PropTypes from 'prop-types';

// Tab element
// Empty tab used as a stub for GroupTab
function Tab(props) {
    if (!props.name) {
        console.error('Tab element must have name')
    }
    if (Children.count(props.children) === 0) {
        console.error('Tab element must contain some content')
    }

    return null;
}

Tab.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default Tab;