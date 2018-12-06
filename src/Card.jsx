import React, { memo } from 'react';

// Libraries / Context
import { withRouter, Link } from 'react-router-dom';

// Icons
import { ReactComponent as Waitlist } from './icons/waitlist.svg';
import { ReactComponent as Pin } from './icons/pin.svg';

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

    return <div className="card-waitlist-empty-icon"></div>;
}

const setScrollPos = (index) => {
    localStorage.setItem('scrollPos', Number(index));
}

const CourseCard = ({item, theme, index, pinned, removePin, location, codeNoSpaces}) => (
    <Link to={{ pathname: '/' + codeNoSpaces, state: {item: item, prev: true} }} onClick={() => setScrollPos(index)} title="A course card." className={location === codeNoSpaces ? 'card-active' + theme : 'card' + theme}>
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

const Card = memo(({loading, item, index, theme, pinned, removePin = '', location}) => {    
    if (loading) {
        return <BlankCard theme={theme} />;
    }

    else if (item.code) {
        const currLocation = location.pathname.slice(1);

        return (
            <CourseCard 
                theme={theme} 
                item={item} 
                index={index}
                pinned={pinned} 
                removePin={removePin} 
                location={currLocation}
                codeNoSpaces={item.code.split(' ').join('')}
            />
        );
    }

    return (
        <TeacherCard 
            theme={theme} 
            item={item} 
        />
    );
});

export default withRouter(Card);