import React, { memo } from 'react';

const Content = ({item, theme, classes}) => (
    <div className={"content" + theme}>
        <h1>Description</h1>
        <p>{item.rest.description}</p>
        <b>Prerequisites:</b>
        <p>{item.rest.prerequisites}</p>
        <b>Restrictions:</b>
        <p>{item.rest.restrictions === '' ? 'None.' : item.rest.restrictions}</p>
    </div>
);

export default memo(Content);