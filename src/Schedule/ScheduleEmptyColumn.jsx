import React from 'react';

const ScheduleEmptyColumn = ({ intervalWithHalf, theme }) => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		{intervalWithHalf.map((time, index) => (
			<div
				key={time}
				className={index % 2 === 0 ? 'schedule-empty-column' + theme : 'schedule-empty-column2' + theme}
			/>
		))}
	</div>
);

export default ScheduleEmptyColumn;
