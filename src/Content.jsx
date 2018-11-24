import React, { memo } from 'react';

import MetricBox from './MetricBox';
import Sections from './Section/Sections';
import BlingStrip from './BlingStrip';

import { capitalizeFirstLetter } from './Utils';

const formatRestrictions = restrictions => {
    const formattedSplit = restrictions.split(',').slice(0, -1);

    if (formattedSplit.length === 1) {
        return formattedSplit[0] + '.';    
    }

    else if (formattedSplit.length === 2) {        
        let base = '';

        for (let restriction of formattedSplit) {
            let stuff = restriction.replace('Open to ', '').replace(' Only', '') + ','
            base = base.concat(stuff);
        }

        let formatted = "Open to " + base.slice(0, -1) + ' Only';

        console.log(formatted);

        return restrictions;
    }

    else {
        let base = '';

        console.log(formattedSplit.sort());

        for (let restriction of formattedSplit) {
            let stuff = restriction.replace('Open to ', '').replace(' Only', '') + ','
            base = base.concat(stuff);
        }

        let formatted = "Open to " + base.slice(0, -1) + ' Only';

        console.log(formatted);

        return restrictions;
    }
}

const DescriptionBox = ({item}) => (
    <>
        <h1>Description</h1>
        <p>{item.description === '???' ? '---' : item.description}</p>
        <b>Prerequisites:</b>
        <p>{item.prerequisites === '???' ? 'None.' : capitalizeFirstLetter(item.prerequisites)}</p>
        <b>Restrictions:</b>
        <p>{item.restrictions === '' ? 'None.' : formatRestrictions(item.restrictions)}</p>
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