import React, { memo } from 'react';

// Libraries / Context
import { Link } from 'react-router-dom';

import {ReactComponent as Waitlist} from './icons/waitlist.svg';

const WaitlistIcon = ({waitlist, theme}) => {
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

const CourseCard = ({item, theme}) => (
    <Link to={{ pathname: "/" + item.code.split(' ').join(''), state: {item: item} }} title="A course card." className={'card' + theme}>
        <div className="card-width">
            <p className="card-code">{item.code}</p>
            <p className={"card-title" + theme}>{item.title}</p>
        </div>
        <WaitlistIcon waitlist={item.waitlist} theme={theme}/>
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

const Card = ({item, theme}) => {
    if (item.code) {
        return (
            <CourseCard theme={theme} item={item} />
        );
    }

    return (
        <TeacherCard theme={theme} item={item} />
    );
}

export default memo(Card);