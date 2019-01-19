import React, { PureComponent, Fragment } from 'react';

// Libraries
import { convert } from './Utils';

const Metric = ({ name, color, children }) => (
	<div className="metric">
		<b className="metric-header" style={{ backgroundColor: color }}>
			{name}
		</b>
		<div className="metric-body" style={{ border: '2px solid ' + color }}>
			<div>{children}</div>
		</div>
	</div>
);

export default class MetricBox extends PureComponent {
	constructor(props) {
		super(props);

		// metrics has the following format: [cape expected grade, cape average study, cape received grade, seats taken / seats available].
		this.state = {
			metrics: [ 'N/A', 'N/A', 'N/A', 'N/A' ],
			waitlist: false,
			code: ''
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.code !== nextProps.code) {
			let metricsInfo = [ 0, 0, 0 ];
			let seatInfo = [ 0, 0 ];
			let numSections = 0;
			let waitlist = false;

			for (const section of Object.values(nextProps.sections)) {
				const capeData = section['cape'];
				const seats = section['section'];

				// Handle getting CAPE Data.
				if (capeData !== 'N/A') {
					metricsInfo[0] += capeData['expected'];
					metricsInfo[1] += capeData['study'];
					metricsInfo[2] += capeData['received'];

					numSections += 1;
				}

				// Handle getting seat information.
				for (const i in seats) {
					const taken = seats[i]['seats taken'] !== 'Blank' ? seats[i]['seats taken'] : null;

					if (taken === null) {
						continue;
					} else if (taken === 9223372036854776000) {
						seatInfo[0] = 'Unlimited';
						break;
					}

					seatInfo[0] += taken;
					seatInfo[1] += seats[i]['seats available'] !== 'Blank' ? seats[i]['seats available'] : null;
				}
			}

			if (numSections !== 0) {
				metricsInfo = [
					(metricsInfo[0] / numSections).toFixed(2),
					(metricsInfo[1] / numSections).toFixed(2),
					(metricsInfo[2] / numSections).toFixed(2),
					''
				];

				if (metricsInfo.length > 0) {
					metricsInfo[0] = convert(metricsInfo[0]);
					metricsInfo[2] = convert(metricsInfo[2]);
				}
			}

			if (seatInfo[0] === 'Unlimited') {
				metricsInfo[3] = [ 'Unlimited' ];
			} else {
				waitlist = seatInfo[0] >= seatInfo[1];
				metricsInfo[3] = [ seatInfo[0], seatInfo[1] ];
			}

			return {
				metrics: [
					numSections === 0 ? 'N/A' : metricsInfo[0],
					numSections === 0 ? 'N/A' : metricsInfo[1],
					numSections === 0 ? 'N/A' : metricsInfo[2],
					metricsInfo[3]
				],
				waitlist: waitlist,
				code: nextProps.code
			};
		}

		return null;
	}

	render() {
		const { metrics, waitlist } = this.state;

		return (
			<Fragment>
				<h1>Overview</h1>
				<div className="metric-list">
					<Metric name="Expected Grade" color="#A2CDFF">
						{metrics[0]}
					</Metric>
					<Metric name="Received Grade" color="#AAEEDD">
						{metrics[2]}
					</Metric>
					<Metric name="Study" color="#B8E986">
						{metrics[1]}
						{metrics[1] !== 'N/A' && <p style={{ margin: '0 0 0 5px' }}>hrs/wk</p>}
					</Metric>
					<Metric name="Seats Taken / Limit" color="#FADE91">
						<div title="Total seats taken." style={{ color: waitlist ? 'red' : 'inherit' }}>
							{metrics[3][0]}
						</div>
						{metrics[3].length !== 1 && <div style={{ margin: '0 5px' }}>/</div>}
						<div title="Total seats available.">{metrics[3][1]}</div>
					</Metric>
				</div>
			</Fragment>
		);
	}
}
