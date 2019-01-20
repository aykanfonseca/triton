import React from 'react';

const ScheduleTitles = ({ isNotFinalSchedule, theme }) => (
	<div className={'schedule-titles-container' + theme} style={{ marginTop: isNotFinalSchedule ? '30px' : '0px' }}>
		<b
			className={'schedule-titles-block' + theme}
			style={{
				width: '100px',
				borderRight: theme === '' ? '1px solid #dedede' : '1px solid #444',
				cursor: isNotFinalSchedule ? 'pointer' : 'default'
			}}
		/>
		<b className={'schedule-titles-block' + theme}>Monday</b>
		<b className={'schedule-titles-block' + theme}>Tuesday</b>
		<b className={'schedule-titles-block' + theme}>Wednesday</b>
		<b className={'schedule-titles-block' + theme}>Thursday</b>
		<b className={'schedule-titles-block' + theme}>Friday</b>
	</div>
);

export default ScheduleTitles;
