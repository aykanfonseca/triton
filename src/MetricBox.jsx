import React, { PureComponent } from 'react';

import { convert } from './Utils';

const GradeMetric = ({grade}) => (
    <div className="metric">
        <div className="metric-header" style={{backgroundColor: '#A2CDFF'}}>
            <b>{"Average Grade"}</b>
            <span style={{cursor: 'pointer', marginLeft: '5px'}} title="Links to CAPE for this class." onClick={()=> window.open('http://cape.ucsd.edu/responses/Results.aspx?courseNumber=' + this.state.code.replace(' ', '+'))}>
                <div style={{marginTop: '5px'}}>
                    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8.068 7.729l-.655.655c.535.55.684.83.785 1.16.107.354.107.716 0 1.07-.107.353-.27.647-.9 1.278l-1.352 1.35c-.63.63-.924.794-1.278.9a1.817 1.817 0 0 1-1.07 0c-.353-.106-.647-.27-1.277-.9l-.879-.878c-.63-.63-.793-.924-.9-1.278a1.817 1.817 0 0 1 0-1.07c.107-.353.27-.647.9-1.278l1.351-1.35c.63-.63.925-.794 1.279-.9a1.817 1.817 0 0 1 1.069 0c.33.1.61.248 1.16.783l.655-.655c-.535-.55-.684-.83-.784-1.16a1.817 1.817 0 0 1 0-1.07c.107-.353.27-.647.9-1.278l1.351-1.35c.63-.63.925-.794 1.279-.9a1.817 1.817 0 0 1 1.069 0c.353.106.648.27 1.278.9l.878.878c.63.63.794.924.9 1.278.108.354.108.716 0 1.07-.106.353-.27.647-.9 1.278l-1.35 1.35c-.631.63-.925.794-1.279.9a1.817 1.817 0 0 1-1.07 0c-.33-.1-.609-.248-1.16-.783zm1.153-1.153l.654.653 2.669-2.67-2.42-2.418-2.668 2.67.653.652.376-.375A.786.786 0 0 1 9.597 6.2l-.376.376zM5.148 8.424l-.653-.653-2.67 2.67 2.42 2.418 2.669-2.67-.654-.652-.292.291a.786.786 0 1 1-1.112-1.112l.292-.292z" fill="#4573fd"/></svg>
                </div>
            </span>
        </div>
        <div className="metric-body" style={{border: '2px solid #A2CDFF'}} >{grade}</div>
    </div>
);

const StudyMetric = ({study}) => (
    <div className="metric">
        <div className="metric-header" style={{backgroundColor: '#AAEEDD'}}>
            <b>{"Average Study"}</b>
        </div>
        <div className="metric-body" style={{border: '2px solid #AAEEDD'}}>
            <div>{study}</div>
            {(study !== 'N/A') && <div style={{marginLeft: '5px'}}>hrs/week</div>}
        </div>
    </div>
);

const SeatMetric = ({seat, waitlist}) => (
    <div className="metric">
        <div className="metric-header" style={{backgroundColor: '#B8E986'}}><b>{"Seats Taken / Available"}</b></div>
        <div className="metric-body" style={{border: '2px solid #B8E986'}}>
            {(seat.length === 1) ?
                    <div style={{padding: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'center'}} >
                        <div style={{fontSize: '28px'}}>{"Unlimited"}</div>
                    </div>
                : 
                    <div style={{padding: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'center'}} >
                        <div title="Total seats taken." style={{fontSize: '28px', marginRight: '5px', color: (waitlist) ? 'red' : 'inherit'}}>{seat[0]}</div>
                        <div>{"/"}</div>
                        <div title="Total seats available." style={{marginLeft: '5px'}}>{seat[1]}</div>
                        {(waitlist) && 
                            <div title="Has a waitlist." style={{marginLeft: '5px'}}>
                                <svg width="11" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M9.35 6.267h.963c.412 0 .687.266.687.666v6.4c0 .4-.275.667-.688.667H.688A.677.677 0 0 1 0 13.333v-6.4c0-.4.275-.666.688-.666h.962V3.6h1.513v2.667h4.675V3.6H9.35v2.667zm0-2.667h-7.7c0-2 1.788-3.6 3.85-3.6 2.063 0 3.85 1.6 3.85 3.6zm-1.512 0c0-1.2-1.032-2.2-2.338-2.2-1.265 0-2.3.974-2.337 2.2h4.675z" fill="red"/></svg>
                            </div>
                        }
                    </div>
            }
        </div>
    </div>
);

export default class MetricBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            metrics: ["N/A", "N/A", "N/A", "N/A"],
            waitlist: false,
            code: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.code !== prevState.code) {
            let metricInformation = [0, 0, 0];
            let seatInformation = [0, 0];
            let numSections = 0;
            let waitlist = false;

            for (const property in nextProps.rest) {
                if (typeof(nextProps.rest[property]) === 'object' && property !== 'podcast') {
                    const capeData = nextProps.rest[property]['cape'];
                    const seats = nextProps.rest[property]['section'];

                    // Handle getting CAPE Data.
                    if (capeData !== 'N/A') {
                        metricInformation[0] += capeData['expected']
                        metricInformation[1] += capeData['study']
                        metricInformation[2] += capeData['received']

                        numSections += 1;
                    }

                    // Handle getting seat information.
                    for (const i in seats) {
                        const taken = (seats[i]['seats taken'] !== 'Blank') ? seats[i]['seats taken'] : null;

                        if (taken === null) {
                            continue;
                        }

                        else if (taken === 9223372036854776000) {
                            seatInformation[0] = "Unlimited";
                            break;
                        }
                        
                        seatInformation[0] += taken;
                        seatInformation[1] += (seats[i]['seats available'] !== 'Blank') ? seats[i]['seats available'] : null;
                    }
                }
            }

            if (numSections !== 0) {
                metricInformation = [
                    (metricInformation[0] / numSections).toFixed(2), 
                    (metricInformation[1] / numSections).toFixed(2),
                    (metricInformation[2] / numSections).toFixed(2),
                    ''
                ];

                if (metricInformation.length > 0) {
                    metricInformation[0] = convert(metricInformation[0])
                }
            }

            if (seatInformation[0] === "Unlimited") {
                metricInformation[3] = ["Unlimited"];
            }

            else if (seatInformation[0] >= seatInformation[1]) {
                waitlist = true;
                metricInformation[3] = [seatInformation[0], seatInformation[1]];
            }

            else {
                metricInformation[3] = [seatInformation[0], seatInformation[1]];
            }

            return {
                metrics: [
                    (numSections === 0) ? 'N/A' : metricInformation[0], 
                    (numSections === 0) ? 'N/A' : metricInformation[1],
                    (numSections === 0) ? 'N/A' : metricInformation[2],
                    metricInformation[3]
                ], 
                waitlist: waitlist,
                code: nextProps.code
            }
        }

        return null;
    }

    render() {
        const { metrics, waitlist } = this.state;

        if (metrics.length > 0) {
            return (
                <div className="metric-list">
                    <GradeMetric grade={metrics[0]} />
                    <StudyMetric study={metrics[1]} />
                    <SeatMetric seat={metrics[3]} waitlist={waitlist} />
                </div>
            );
        }

        return null;
    }
};