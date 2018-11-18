
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Cancel } from './icons/cancel.svg';
import { ReactComponent as Pin } from './icons/pin.svg';

const CancelBtn = ({theme}) => (
    <Link to="/" title="Click to close" className={"btn-close" + theme}>
        <Cancel />
    </Link>
);

const PinBtn = ({theme, addPin, removePin, pinned, item}) => (
    <div 
        title={pinned.includes(item) ? "Click to unpin" : "Click to pin"} 
        onClick={pinned.includes(item) ? () => removePin(item) : () => addPin(item)} 
        className={pinned.includes(item) ? "btn-pin-active" + theme : "btn-pin" + theme}>
        <Pin />
    </div>    
)

const Ribbon = ({item, addPin, removePin, pinned, theme, isMobile}) => (
    <div className={"ribbon" + theme}>
        <div className={"title" + theme}>
            <h1>{item.code}</h1>
            <b>{item.title}</b>
        </div>
        {!isMobile && 
            <div style={{display: "flex", flexDirection: 'row'}}>
                <div className={"units" + theme}>
                    {item.units}
                    <span>Units</span>
                </div>
                <PinBtn theme={theme} item={item} addPin={addPin} removePin={removePin} pinned={pinned} />
                <CancelBtn theme={theme} />
            </div>
        }
    </div>
);

export default memo(Ribbon);