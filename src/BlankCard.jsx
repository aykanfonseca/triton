import React, { memo } from 'react';

const BlankCard = ({theme}) => (
    <span className={"blankcard" + theme}>
        <div>
            <div className={"blankcard-header" + theme}></div>
            <div className={"blankcard-subtitle" + theme}></div>
        </div>
    </span>
);

export default memo(BlankCard);