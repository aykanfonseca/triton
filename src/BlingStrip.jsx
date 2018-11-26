import React, { memo } from 'react';

import { ReactComponent as WaitlistIcon } from './icons/tag_waitlist.svg';
import { ReactComponent as DeiIcon } from './icons/tag_dei.svg';

const Waitlist = () => (
    <div className="bling-strip" title="Course is waitlisted" style={{width: '150px', backgroundColor: '#F7F7F7'}}>
        <WaitlistIcon />
        <b>Waitlisted</b>
    </div>
);

const Dei = () => (
    <div className="bling-strip" title="A DEI approved course" style={{width: '180px', backgroundColor: '#EDF4FA'}}>
        <DeiIcon />
        <b>DEI-approved</b>
    </div>
);

const BlingStrip = ({item}) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
        { item.waitlist && <Waitlist /> }
        { item.dei && <Dei /> }
    </div>
);

export default memo(BlingStrip);