import React, { PureComponent } from 'react';

// Libraries
import { handleTime, handleLocation, handleSeats, handleDays, convertBlank } from './Utils';

// Icons
import { ReactComponent as Dropdown } from './icons/dropdown.svg';

export default class Row extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			row: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.row !== prevState.row) {
			return {
				row: nextProps.row
			};
		}

		return null;
	}

	hasDropdown = (isHeader, hasSubrows, theme) => {
		if (isHeader) {
			return (
				<div className={hasSubrows ? 'dropdown' + theme : 'block2' + theme} style={{ width: '45px' }}>
					{hasSubrows && <Dropdown />}
				</div>
			);
		}

		return <div style={{ width: '45px' }} />;
	};

	render() {
		const { isHeader = false, hasSubrows = false, theme } = this.props;
		const { row } = this.state;

		const available = convertBlank(row['seats available']);
		const taken = convertBlank(row['seats taken']);

		const waitlist = taken !== null && taken !== 9223372036854776000 && taken >= available ? true : false;

		const {
			name,
			id,
			number,
			days,
			'meeting type': meetingType,
			'start time': startTime,
			'end time': endTime,
			building,
			room,
			'seats available': seatsAvailable,
			'seats taken': seatsTaken
		} = row;

		return (
			<div className={isHeader ? 'section' + theme : 'subinfo-row' + theme}>
				{this.hasDropdown(isHeader, hasSubrows, theme)}
				<div className={isHeader ? 'block2' + theme : 'block'} style={{ width: '90px' }}>
					{convertBlank(id)}
				</div>
				<div className={isHeader ? 'block2' + theme : 'block'} style={{ width: '70px' }}>
					{convertBlank(number)}
				</div>
				<div className={isHeader ? 'block2' + theme : 'block'} style={{ width: '60px' }}>
					{convertBlank(meetingType)}
				</div>
				<div className={isHeader ? 'block2' + theme : 'block'} style={{ width: '200px' }}>
					<div style={{ marginRight: '10px' }}>{handleDays(days)}</div>
					<div>{handleTime(startTime, endTime)}</div>
				</div>
				<div className={isHeader ? 'block2' + theme : 'block'} style={{ width: '100px' }}>
					{handleLocation(building, room)}
				</div>
				<div
					className={isHeader ? 'block2' + theme : 'block'}
					style={{ width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto' }}
				>
					<div
						style={{
							fontWeight: '500',
							padding: '5px',
							borderRadius: '7px',
							backgroundColor: theme === '' ? '#EDF4FA' : '#D2E3FB',
							color: theme === '' ? '#0000EE' : '#333',
							cursor: 'pointer'
						}}
					>
						{convertBlank(name)}
					</div>
				</div>
				<div
					className={isHeader ? 'block2' + theme : 'block'}
					title={
						waitlist ? (
							'If number is 0, it is exactly full. Else it has a waitlist of this number.'
						) : (
							'Seats taken / Seats available.'
						)
					}
					style={waitlist ? { fontWeight: '500', color: 'red', width: '100px' } : { width: '100px' }}
				>
					{handleSeats(seatsAvailable, seatsTaken)}
				</div>
			</div>
		);
	}
}
