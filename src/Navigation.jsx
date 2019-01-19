import React from 'react';

// Libraries
import { Link, withRouter } from 'react-router-dom';

// Icons
import { ReactComponent as Cancel } from './icons/cancel.svg';
import { ReactComponent as Pin } from './icons/pin.svg';
import { ReactComponent as PinDisabled } from './icons/pin-disable.svg';
import { ReactComponent as Settings } from './icons/settings.svg';
import { ReactComponent as Schedule } from './icons/schedule.svg';
import { ReactComponent as Save } from './icons/save.svg';

const CancelBtn = ({ theme }) => (
	<Link to={{ pathname: '/', state: { prev: false } }} title="Click to close" className={'btn-nav' + theme}>
		<Cancel />
		Close
	</Link>
);

const PinBtn = ({ theme, addPin, removePin, pinned, item }) => {
	return (
		<div
			title={pinned.includes(item) ? 'Click to unpin' : 'Click to pin'}
			onClick={pinned.includes(item) ? () => removePin(item) : () => addPin(item)}
			className={pinned.includes(item) ? 'active-btn-nav' + theme : 'btn-nav' + theme}
		>
			<Pin />
			{pinned.includes(item) ? 'Planned' : 'Plan'}
		</div>
	);
};

const MoreBtn = ({ theme }) => (
	<Link to="/" title="Go to settings" className={'btn-nav' + theme}>
		<Settings style={{ margin: '8px 0 7px 0' }} />
		More
	</Link>
);

const ScheduleBtn = ({ theme }) => (
	<Link to={{ pathname: '/schedule', state: { prev: true } }} title="Go to Schedule" className={'btn-nav' + theme}>
		<Schedule />
		Schedule
	</Link>
);

const SaveBtn = ({ theme }) => (
	<div title="Save your schedule" className={'btn-nav' + theme}>
		<Save />
		Save
	</div>
);

const Navigation = ({ location, theme, type = '', addPin, removePin, clearPins, pinned, isMobile = false }) => {
	if (type === 'course') {
		const item = location.state.item;

		return (
			<div className={'navigation' + theme}>
				<PinBtn theme={theme} addPin={addPin} removePin={removePin} pinned={pinned} item={item} />
				<CancelBtn theme={theme} />
			</div>
		);
	} else if (type === 'schedule') {
		return (
			<div className={'navigation' + theme}>
				<SaveBtn theme={theme} />
				<CancelBtn theme={theme} />
			</div>
		);
	} else {
		if (isMobile) {
			return (
				<div className={'navigation' + theme}>
					<ScheduleBtn theme={theme} />
					<MoreBtn theme={theme} />
				</div>
			);
		}

		return (
			<div className={'navigation' + theme} style={{ alignItems: 'center' }}>
				<Link
					to={{ pathname: '/schedule', state: { prev: true } }}
					title="Go to Schedule"
					style={{
						fontSize: '20px',
						fontWeight: 'bold',
						textDecoration: 'none',
						backgroundColor: theme === '' ? '#2181f7' : '#724AE2',
						height: '100%',
						color: '#fff',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					View Schedule
					<Schedule style={{ fill: '#fff', marginLeft: '10px', transform: 'scale(1.1)' }} />
				</Link>
			</div>
		);
	}
};

export default withRouter(Navigation);
