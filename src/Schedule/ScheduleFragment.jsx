import React, { memo } from 'react';

import { convertTime } from '../Utils';

const ScheduleFragment = ({time, theme}) => (
    <>
        <div className={'schedule-fragment' + theme}>{convertTime(time)}</div>
        <div className={'schedule-fragment2' + theme}></div>
    </>
);

export default memo(ScheduleFragment);