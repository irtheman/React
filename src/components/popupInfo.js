import React from "react";
import PropTypes from 'prop-types';
import { ifVal } from './components-helpers';
import '../sass/popupinfo.scss';
import DefaultImg from '../assets/default.png';

const PopupInfo = (props) => {
    let imageUrl  = ifVal(props.img, props.img, DefaultImg);

    return (
        <span className='wrapper'>
            <span data-testid='icon' className='icon' tabIndex='0'>
                <img data-testid='img' src={imageUrl} alt={imageUrl.split('\\').pop().split('/').pop()}/>
            </span>
            <span data-testid='info' className='popupinfo'>
                {props.children}
            </span>
        </span>
    );
}

PopupInfo.propTypes = {
    img: PropTypes.string,
}

export default PopupInfo;