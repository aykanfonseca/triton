import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const Page = ({ children, background, location: { state }}) => (
    <div className={classNames({ page: true, 'page--prev': state && state.prev })}  style={{ background }}>
        <div className="page__inner">
            {children}
        </div>
    </div>
);

export default withRouter(Page);