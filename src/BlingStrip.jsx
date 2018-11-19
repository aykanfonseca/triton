import React, { memo } from 'react';

import {ReactComponent as WaitlistTag} from './icons/tag_waitlist.svg';
import {ReactComponent as DeiTag} from './icons/tag_dei.svg';

const WaitlistIcon = () => (
    <div className="bling-strip" title="Course is waitlisted" style={{backgroundColor: '#F7F7F7'}}>
        <WaitlistTag />
        <b>Waitlisted</b>
    </div>
);

const DeiIcon = () => (
    <div className="bling-strip" title="A DEI approved course" style={{backgroundColor: '#EDF4FA'}}>
        <DeiTag />
        <b>DEI-approved</b>
    </div>
);

const BlingStrip = ({item}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
        { item.waitlist && <WaitlistIcon /> }
        { item.dei && <DeiIcon /> }
    </div>
);

export default memo(BlingStrip);