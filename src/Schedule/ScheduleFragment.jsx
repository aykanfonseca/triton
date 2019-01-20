import React, { Fragment } from 'react';

import { convertTime } from '../Utils';

const ScheduleFragment = ({ time, theme }) => (
	<Fragment>
		<div className={'schedule-fragment' + theme}>{convertTime(time)}</div>
		<div className={'schedule-fragment2' + theme} />
	</Fragment>
);

export default ScheduleFragment;
