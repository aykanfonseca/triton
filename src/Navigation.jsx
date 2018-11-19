import React, { memo } from 'react';

// Libraries / Context
import { Link } from 'react-router-dom';

import { ReactComponent as Cancel } from './icons/cancel.svg';
import { ReactComponent as Pin } from './icons/pin.svg';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ReactComponent as Email } from './icons/email.svg';
import { ReactComponent as Schedule } from './icons/schedule.svg';
import { ReactComponent as Save } from './icons/save.svg';

const CancelBtn = ({theme}) => (
    <Link to="/" title="Click to close" className={"btn-nav" + theme}>
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

const SettingsBtn = ({theme}) => (
    <Link to="/" title="Go to settings" className={"btn-nav" + theme}>
        <Settings style={{margin: '8px 0 7px 0'}} />
        <div>More</div>
    </Link>
);

const ScheduleBtn = ({theme}) => (
    <Link to="/schedule" title="Go to settings" className={"btn-nav" + theme}>
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

const Navigation = ({theme, type, addPin, removePin, pinned, item = '', isMobile = false}) => {
    if (type === 'course') {
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

    else if (type === 'teacher') {
        return (
            <div className={'navigation' + theme}>
                <EmailBtn theme={theme} />
                <CancelBtn theme={theme} />
            </div>
        );
    }

    else if (type === 'schedule') {
        return (
            <div className={'navigation' + theme}>
                <SaveBtn theme={theme} />
                <CancelBtn theme={theme} />
            </div>
        );
    }

    else if (type === 'home') {
        if (isMobile) {
            return (
                <div className={'navigation' + theme}>
                    <ScheduleBtn theme={theme} />
                    <SettingsBtn theme={theme} />
                </div>
            );
        }

        return (
            <div className={'navigation' + theme}>
                <ScheduleBtn theme={theme} />
            </div>
        );
    }
};

export default memo(Navigation);