import React, { Component } from 'react';
import SubSection from './SubSection.jsx';

import { handleTime, handleLocation, handleSeats, handleDays, convertBlank, getDerivedStateFromProps_Sections } from '../Utils';

export default class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            row: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let rowTemp = nextProps.rows.section;

        if (typeof(nextProps.rows.final) !== "undefined") {
            rowTemp = rowTemp.concat(nextProps.rows.final);
        }

        return getDerivedStateFromProps_Sections(rowTemp, prevState.row);
    }

    render() {
        const { theme } = this.props;
        const { row, waitlist } = this.state;

        const subsequentRows = row.slice(2);
        const { 
            name, 
            id, 
            number, 
            days,
            "meeting type": meetingType, 
            "start time": startTime, 
            "end time": endTime, 
            building, 
            room, 
            "seats available": seatsAvailable, 
            "seats taken": seatsTaken 
        } = row[1];

        return (
            <div className="accor">
                <div className={'section' + theme}>
                    <div className={subsequentRows.length > 0 ? (theme === '' ? "dropdown" : "dropdown-dark") : (theme === '' ? "block2" : 'block2-dark')} style={{width: '45px'}}>
                        {subsequentRows.length > 0 && <svg width="21" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.328 7.486L17.286.528a1.842 1.842 0 0 1 2.611.004c.723.722.716 1.9.004 2.612l-7.853 7.853a1.837 1.837 0 0 1-1.371.54 1.88 1.88 0 0 1-2.014-.413L.701 3.162c-.73-.73-.734-1.91.004-2.648A1.88 1.88 0 0 1 3.352.51l6.976 6.976z" fill="#FFF"/></svg>}
                    </div>
                    <div className={"block2" + theme} style={{width: '90px'}}>
                        {convertBlank(id)}
                    </div>
                    <div className={"block2" + theme} style={{width: '70px'}}>
                        {convertBlank(number)}
                    </div>
                    <div className={"block2" + theme} style={{width: '60px'}}>
                        {convertBlank(meetingType)}
                    </div>
                    <div className={"block2" + theme} style={{width: '200px'}} >
                        <div style={{marginRight: '10px'}}>{handleDays(days)}</div>
                        <div>{handleTime(startTime, endTime)}</div>
                    </div>
                    <div className={"block2" + theme} style={{width: '100px'}}>
                        {handleLocation(building, room)}
                    </div>
                    <div className={"block2" + theme} style={{width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto'}}>
                        <div title="Click to see info about a teacher" style={{fontWeight: '500', padding: '5px', borderRadius: '7px', backgroundColor: theme === '' ? '#EDF4FA' : '#D2E3FB', color: theme === '' ? '#0000EE' : '#333',  cursor: 'pointer'}}>{convertBlank(name)}</div>
                    </div>
                    <div className={"block2" + theme} title={waitlist ? "If number is 0, it is exactly full. Else it has a waitlist of this number." : "Seats taken / Seats available."} style={waitlist ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                        {handleSeats(seatsAvailable, seatsTaken)}
                    </div>
                </div>

                <div className={"body" + theme} style={{display: 'inline-block'}}>
                    {subsequentRows.map((i, index) => 
                        <SubSection theme={theme} key={index} row={i}/>
                    )}
                </div>
            </div>
        );
    }
};