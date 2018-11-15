import React, { memo } from 'react';

import MetricBox from './MetricBox';
import SectionContainer from './SectionContainer';

import { capitalizeFirstLetter } from './Utils';

import {ReactComponent as WaitlistTag} from './icons/tag_waitlist.svg';
import {ReactComponent as DeiTag} from './icons/tag_dei.svg';

const WaitlistIcon = () => (
    <div style={{height: '50px', width: '150px', backgroundColor: '#F7F7F7', borderRadius: '8px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', marginRight: '10px', color: '#333'}}>
        <WaitlistTag style={{marginRight: '10px'}}/>
        <b>Waitlisted</b>
    </div>
);

const DeiIcon = () => (
    <div style={{height: '50px', width: '190px', backgroundColor: '#EDF4FA', borderRadius: '8px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', marginRight: '10px', color: '#333'}}>
        <DeiTag style={{marginRight: '10px'}}/>
        <b>DEI-approved</b>
    </div>
);

const Content = ({item, theme}) => (
    <div className={"content" + theme}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            { item.waitlist && <WaitlistIcon /> }
            { item.dei && <DeiIcon /> }
        </div>
        <h1>Description</h1>
        <p>{item.rest.description}</p>
        <b>Prerequisites:</b>
        <p>{capitalizeFirstLetter(item.rest.prerequisites)}</p>
        <b>Restrictions:</b>
        <p>{item.rest.restrictions === '' ? 'None.' : item.rest.restrictions}</p>
        <h1>Overview</h1>
        <MetricBox 
            theme={theme} 
            rest={item.rest}
            code={item.code}
        />
        <h1>Sections</h1>
        <SectionContainer
            code={item.code}
            rest={item.rest}
        />
    </div>
);

export default memo(Content);