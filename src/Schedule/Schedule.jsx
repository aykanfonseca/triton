import React, { PureComponent } from 'react';

// Custom Components.
import Navigation from '../Navigation';
import ScheduleContent from './ScheduleContent';
import Ribbon from '../Ribbon';

export default class Schedule extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			reference: ''
		};
	}

	setRef = (ref) => {
		this.setState({ reference: ref });
	};

	render() {
		const { isMobile, pinned, theme } = this.props;

		return (
			<div className={'rightpane' + theme}>
				<Ribbon theme={theme} isMobile={isMobile} isSchedule="True" />
				<div className={'content' + theme}>
					<ScheduleContent pinned={pinned} setRef={this.setRef} theme={theme} />
				</div>
				{isMobile && (
					<Navigation theme={theme} type="schedule" pinned={pinned} reference={this.state.reference} />
				)}
			</div>
		);
	}
}
