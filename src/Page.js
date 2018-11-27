import React, { memo } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const Page = memo(({ background, children, location: { state }}) => (
    <div className={classNames({ page: true, 'page--prev': state && state.prev })} style={{backgroundColor: background}}>
        <div className="page__inner">
            { children }
        </div>
    </div>
));

export default withRouter(Page);