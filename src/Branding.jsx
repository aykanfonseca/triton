import React, { memo } from 'react';

// Custom Components
import {ReactComponent as Trident} from './icons/trident.svg';

const Branding = ({theme, changeTheme}) => (
    <div className={'branding' + theme} onClick={changeTheme} title="Triton Courses - a convenient way to plan your courses!">
        <h1>Triton</h1>
        <Trident />
        <h1>Courses</h1>
    </div>
);

export default memo(Branding);