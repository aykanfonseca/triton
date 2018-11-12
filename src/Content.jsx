import React, { memo } from 'react';

import MetricBox from './MetricBox';

import { capitalizeFirstLetter } from './Utils';

const Content = ({item, theme, classes}) => (
    <div className={"content" + theme}>
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
    </div>
);

export default memo(Content);