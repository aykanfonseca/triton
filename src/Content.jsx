import React, { memo } from 'react';

const Content = ({item, theme}) => (
    <div className={"content" + theme}>
        <h1>Description</h1>
        <p>{item.rest.description}</p>
    </div>
);

export default memo(Content);