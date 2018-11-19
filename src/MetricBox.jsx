import React, { PureComponent } from 'react';

import { convert } from './Utils';

const GradeMetric = ({grade}) => (
    <div className="metric">
        <b className="metric-header" style={{backgroundColor: '#A2CDFF'}}>{"Average Grade"}</b>
        <div className="metric-body" style={{border: '2px solid #A2CDFF'}}>{grade}</div>
    </div>
);

const StudyMetric = ({study}) => (
    <div className="metric">
        <b className="metric-header" style={{backgroundColor: '#AAEEDD'}}>{"Average Study"}</b>
        <div className="metric-body" style={{border: '2px solid #AAEEDD'}}>
            <div>{study}</div>
            {(study !== 'N/A') && <div style={{marginLeft: '5px'}}>hrs/week</div>}
        </div>
    </div>
);

const SeatMetric = ({seat, waitlist}) => (
    <div className="metric">
        <b className="metric-header" style={{backgroundColor: '#B8E986'}}>{"Seats Taken / Available"}</b>
        <div className="metric-body" style={{border: '2px solid #B8E986'}}>
            {(seat.length === 1) ?
                    <div style={{padding: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'center'}} >
                        <div>{"Unlimited"}</div>
                    </div>
                : 
                    <div style={{padding: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'center'}} >
                        <div title="Total seats taken." style={{marginRight: '5px', color: (waitlist) ? 'red' : 'inherit'}}>{seat[0]}</div>
                        <div>{"/"}</div>
                        <div title="Total seats available." style={{marginLeft: '5px'}}>{seat[1]}</div>
                    </div>
            }
        </div>
    </div>
);

export default class MetricBox extends PureComponent {
    constructor(props) {
        super(props);

        // metrics has the following format: [cape expected grade, cape average study, cape received grade, seats taken / seats available].
        this.state = {
            metrics: ["N/A", "N/A", "N/A", "N/A"],
            waitlist: false,
            code: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.code !== nextProps.code) {
            let metricsInfo = [0, 0, 0];
            let seatInfo = [0, 0]; 
            let numSections = 0;
            let waitlist = false;

            for (const sectionNum in nextProps.sections) {
                const section = nextProps.sections[sectionNum];

                const capeData = section['cape'];
                const seats = section['section'];

                // Handle getting CAPE Data.
                if (capeData !== 'N/A') {
                    metricsInfo[0] += capeData['expected']
                    metricsInfo[1] += capeData['study']
                    metricsInfo[2] += capeData['received']

                    numSections += 1;
                }

                // Handle getting seat information.
                for (const i in seats) {
                    const taken = (seats[i]['seats taken'] !== 'Blank') ? seats[i]['seats taken'] : null;

                    if (taken === null) {
                        continue;
                    }

                    else if (taken === 9223372036854776000) {
                        seatInfo[0] = "Unlimited";
                        break;
                    }
                    
                    seatInfo[0] += taken;
                    seatInfo[1] += (seats[i]['seats available'] !== 'Blank') ? seats[i]['seats available'] : null;
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
                    metricsInfo[0] = convert(metricsInfo[0])
                }
            }

            if (seatInfo[0] === "Unlimited") {
                metricsInfo[3] = ["Unlimited"];
            }

            else if (seatInfo[0] >= seatInfo[1]) {
                waitlist = true;
                metricsInfo[3] = [seatInfo[0], seatInfo[1]];
            }

            else {
                metricsInfo[3] = [seatInfo[0], seatInfo[1]];
            }

            return {
                metrics: [
                    (numSections === 0) ? 'N/A' : metricsInfo[0], 
                    (numSections === 0) ? 'N/A' : metricsInfo[1],
                    (numSections === 0) ? 'N/A' : metricsInfo[2],
                    metricsInfo[3]
                ], 
                waitlist: waitlist,
                code: nextProps.code
            }
        }
        
        return null;
    }

    render() {
        const { metrics, waitlist } = this.state;

        return (
            <>
                <h1>Overview</h1>
                <div className="metric-list">
                    <GradeMetric grade={metrics[0]} />
                    <StudyMetric study={metrics[1]} />
                    <SeatMetric 
                        seat={metrics[3]}
                        waitlist={waitlist} 
                    />
                </div>
            </>
        );
    }
};