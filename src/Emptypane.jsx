import React, { memo } from 'react';

const EmptyPane = ({theme}) => (
    <div className={"emptypane" + theme}></div>
);

export default memo(EmptyPane);