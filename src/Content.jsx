import React, { memo } from 'react';

// Custom Components
import MetricBox from './MetricBox';
import Sections from './Sections';
import BlingStrip from './BlingStrip';

const DescriptionBox = ({item}) => (
    <>
        <h1>Description</h1>
        <p>{item.description === '???' ? '---' : item.description}</p>
        <b>Prerequisites:</b>
        <p>{item.prerequisites === '???' ? 'None.' : item.prerequisites}</p>
        <b>Restrictions:</b>
        <p>{item.restrictions === '' ? 'None.' : item.restrictions}</p>
    </>
);

const Content = ({item, theme}) => (
    <div className={"content" + theme}>
        <BlingStrip 
            item={item}
        />
        <DescriptionBox 
            item={item}
        />
        <MetricBox 
            code={item.code}
            sections={item.sections}
        />
        <Sections
            key={item.code}
            sections={item.sections}
        />
    </div>
);

export default memo(Content);