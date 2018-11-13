import React, { memo } from 'react';

// Libraries / Context
import { Link } from 'react-router-dom';

import {ReactComponent as Waitlist} from './icons/waitlist.svg';
import {ReactComponent as Pin} from './icons/pin.svg';

const CardIcon = ({waitlist, theme, item, pinned, removePin}) => {
    if (pinned.includes(item)) {
        return (
            <div className="card-pin" onClick={(e) => {e.preventDefault(); removePin(item)}} title="Means there's a waitlist.">
                <Pin />
            </div>
        );
    }

    if (waitlist) {
        return (
            <div className={"card-waitlist" + theme} title="Means there's a waitlist.">
                <Waitlist />
            </div>
        );
    }

    return (
        <div className="card-waitlist-empty-icon"></div>
    );
}

const CourseCard = ({item, theme, pinned, removePin, location}) => (
    <Link to={{ pathname: item.code.split(' ').join(''), state: {item: item} }} title="A course card." className={location === item.code.split(' ').join('') ? 'card-active' + theme : 'card' + theme}>
        <div className="card-width">
            <p className="card-code">{item.code}</p>
            <p className={"card-title" + theme}>{item.title}</p>
        </div>
        <CardIcon 
            pinned={pinned} 
            item={item} 
            waitlist={item.waitlist} 
            theme={theme} 
            removePin={removePin}
        />
    </Link>
);

const TeacherCard = ({item, theme}) => (
    <Link to="/content" title="A teacher card." className={'card' + theme}>
        <div className="card-width">
            <p className="card-code">{item.teacher}</p>
            <p className={"card-title" + theme}>teaches {item.classes.length} {(item.classes.length > 1) ? 'classes' : 'class'} this quarter</p>
        </div>
    </Link>
);

const BlankCard = ({theme}) => (
    <span className={"blankcard" + theme}>
        <div>
            <div className={"blankcard-header" + theme}></div>
            <div className={"blankcard-subtitle" + theme}></div>
        </div>
    </span>
);

const Card = ({loading, item, theme, pinned, removePin = '', location}) => {    
    if (loading) {
        return <BlankCard theme={theme} />;
    }

    else if (item.code) {
        return (
            <CourseCard 
                theme={theme} 
                item={item} 
                pinned={pinned} 
                removePin={removePin} 
                location={location}
            />
        );
    }

    return (
        <TeacherCard 
            theme={theme} 
            item={item} 
        />
    );
}

export default memo(Card);