import React, { memo } from 'react';

// Libraries / Context
import { withRouter } from 'react-router-dom';

// Icons
import { ReactComponent as Cancel } from './icons/cancel.svg';
import { ReactComponent as Pin } from './icons/pin.svg';
import { ReactComponent as Save } from './icons/save.svg';

const CancelBtn = ({isSchedule, theme, history}) => (
    <div title="Click to close" onClick={() => {isSchedule ? history.goBack() : history.push('/')}} className={"btn-close" + theme}>
        <Cancel />
    </div>
);

const PinBtn = ({theme, addPin, removePin, pinned, item}) => (
    <div 
        title={pinned.includes(item) ? "Click to unpin" : "Click to pin"} 
        onClick={pinned.includes(item) ? () => removePin(item) : () => addPin(item)} 
        className={pinned.includes(item) ? "btn-pin-active" + theme : "btn-pin" + theme}>
        <Pin />
    </div>    
);

const SaveBtn = ({theme}) => (
    <div title="Save your schedule" className={"btn-pin" + theme}>
        <Save />
    </div>
);

const Ribbon = memo(({location, addPin = undefined, removePin = undefined, pinned = [], theme, isMobile, isSchedule = false, history}) => {
    const item = location.state.item;

    if (isSchedule) {
        return (
            <div className={"ribbon" + theme}>
                <div className={"title" + theme}>
                    <h1>Schedule</h1>
                </div>
                <div style={{display: "flex", flexDirection: 'row'}}>
                    {!isMobile && <SaveBtn theme={theme} /> }
                    {!isMobile && <CancelBtn isSchedule history={history} theme={theme} /> }
                </div>
            </div>
        );
    }

    return (
        <div className={"ribbon" + theme}>
            <div className={"title" + theme}>
                <h1>{item.code}</h1>
                <b>{item.title}</b>   
            </div>
            <div style={{display: "flex", flexDirection: 'row', whiteSpace: 'nowrap'}}>
                <div className={"units" + theme}>
                    {item.units}
                    <span>Units</span>
                </div>
                {!isMobile && 
                    <PinBtn 
                        theme={theme} 
                        item={item} 
                        addPin={addPin} 
                        removePin={removePin} 
                        pinned={pinned}
                    />
                }
                {!isMobile && <CancelBtn theme={theme} history={history} /> }
            </div>
        </div>
    );
});

export default withRouter(Ribbon);