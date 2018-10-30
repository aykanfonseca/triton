import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Cancel } from './icons/cancel.svg';

const Ribbon = ({item, theme}) => (
    <div className={"ribbon" + theme}>
        <div className={"title" + theme}>
            <h1>{item.code}</h1>
            <p>{item.title}</p>
        </div>
        <Link to="/" title="Click to close" className={"btn-close" + theme}>
            <Cancel />
        </Link>
    </div>
);

export default memo(Ribbon);