import React, { memo } from 'react';

// Libraries / Context
import { Link, withRouter } from 'react-router-dom';

// Icons
import { ReactComponent as Cancel } from './icons/cancel.svg';
import { ReactComponent as Pin } from './icons/pin.svg';
import { ReactComponent as PinDisabled } from './icons/pin-disable.svg';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ReactComponent as Email } from './icons/email.svg';
import { ReactComponent as Schedule } from './icons/schedule.svg';
import { ReactComponent as Save } from './icons/save.svg';

const CancelBtn = ({theme}) => (
    <Link to={{pathname: "/", state: {prev: false} }} title="Click to close" className={"btn-nav" + theme}>
        <Cancel />
        <div>Close</div>
    </Link>
);

const PinBtn = ({theme, addPin, removePin, pinned, item}) => {
    return (
        <div 
            title={pinned.includes(item) ? 'Click to unpin' : 'Click to pin'} 
            onClick={pinned.includes(item) ? () => {removePin(item)} : () => {addPin(item)} }
            className={pinned.includes(item) ? 'active-btn-nav' + theme : 'btn-nav' + theme}
        >
            <Pin />
            <div>{pinned.includes(item) ? 'Planned' : 'Plan'}</div>
        </div>
    );
}

const EmailBtn = ({theme}) => (
    <div title="Click to email" className={"btn-nav" + theme}>
        <Email />
        <div>Email</div>
    </div>
);

const MoreBtn = ({theme}) => (
    <Link to="/" title="Go to settings" className={"btn-nav" + theme}>
        <Settings style={{margin: '8px 0 7px 0'}} />
        <div>More</div>
    </Link>
);

const ScheduleBtn = ({theme}) => (
    <Link to={{pathname: "/schedule", state: {prev: true} }} title="Go to Schedule" className={"btn-nav" + theme}>
        <Schedule />
        <div>Schedule</div>
    </Link>
);

const SaveBtn = ({theme}) => (
    <div title="Save your schedule" className={"btn-nav" + theme}>
        <Save />
        <div>Save</div>
    </div>
);

const Navigation = memo(({location, theme, type = '', addPin, removePin, clearPins, pinned, isMobile = false}) => {
    const navType = type !== '' ? type : location.state.item.code !== undefined ? 'course' : 'teacher';

    if (navType === 'course') {
        const item = location.state.item;

        return (
            <div className={'navigation' + theme}>
                <PinBtn 
                    theme={theme} 
                    addPin={addPin} 
                    removePin={removePin} 
                    pinned={pinned} 
                    item={item}
                />
                <CancelBtn theme={theme} />
            </div>
        );
    }

    else if (navType === 'teacher') {
        return (
            <div className={'navigation' + theme}>
                <EmailBtn theme={theme} />
                <CancelBtn theme={theme} />
            </div>
        );
    }

    else if (navType === 'schedule') {
        return (
            <div className={'navigation' + theme}>
                <SaveBtn theme={theme} />
                <CancelBtn theme={theme} />
            </div>
        );
    }

    else if (navType === 'home') {
        if (isMobile) {
            return (
                <div className={'navigation' + theme}>
                    <ScheduleBtn theme={theme} />
                    <MoreBtn theme={theme} />
                </div>
            );
        }

        return (
            <div className={'navigation' + theme} style={{alignItems: 'center'}}>
                <Link to={{pathname: "/schedule", state: {prev: true} }} title="Go to Schedule" style={{fontWeight: 'bold', textDecoration: 'none', backgroundColor: theme === '' ? '#2181f7' : '#724AE2', height: 'calc(100% - 10px)', color: '#fff', borderRadius: '5px', width: '100%', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    View Schedule
                    <Schedule style={{fill: '#fff', marginLeft: '10px'}} />
                </Link>
                <b onClick={() => clearPins()} style={{backgroundColor: '#EDB576', cursor: 'pointer', height: 'calc(100% - 10px)', color: '#fff', borderRadius: '5px', width: '100%', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Clear Pins
                    <PinDisabled style={{fill: '#fff', marginLeft: '10px'}}/>
                </b>
            </div>
        );
    }
});

export default withRouter(Navigation);