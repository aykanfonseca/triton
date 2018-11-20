import React, { memo } from 'react';

import MetricBox from './MetricBox';
import SectionContainer from './Section/SectionContainer';
import BlingStrip from './BlingStrip';

import { capitalizeFirstLetter } from './Utils';

const DescriptionBox = ({item}) => (
    <>
        <h1>Description</h1>
        <p>{item.description === '???' ? '---' : item.description}</p>
        <b>Prerequisites:</b>
        <p>{item.prerequisites === '???' ? 'None.' : capitalizeFirstLetter(item.prerequisites)}</p>
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
        <SectionContainer
            theme={theme} 
            key={item.code}
            sections={item.sections}
        />
    </div>
);

export default memo(Content);