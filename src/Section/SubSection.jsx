import React, { Component } from 'react';

import { handleTime, handleLocation, handleSeats, handleDays, convertBlank, getDerivedStateFromProps_Sections } from '../Utils';

export default class SubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            row: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return getDerivedStateFromProps_Sections(nextProps.row, prevState.row);
    }

    render() {
        const { theme } = this.props;
        const { row, waitlist } = this.state;

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
        } = row;

        return(
            <div className={"subinfo-row" + theme} style={{display: 'flex', height: '40px', fontSize: '15px'}}>
                <div style={{width: '45px'}}></div>
                <div className="block" style={{width: '90px'}} >
                    {convertBlank(id)}
                </div>
                <div className="block" style={{width: '70px'}} >
                    {convertBlank(number)}
                </div>
                <div className="block" style={{width: '60px'}} >
                    {convertBlank(meetingType)}
                </div>
                <div className="block" style={{width: '200px'}} >
                    <div style={{marginRight: '10px'}}>{handleDays(days)}</div>
                    <div>{handleTime(startTime, endTime)}</div>
                </div>
                <div className="block" style={{width: '100px'}} >
                    {handleLocation(building, room)}
                </div>
                <div className="block" style={{width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto'}} >
                    <div title="Click to see info about a teacher!" style={{fontWeight: '500', padding: '5px', borderRadius: '7px', backgroundColor: theme === '' ? '#EDF4FA' : '#D2E3FB', color: theme === '' ? '#0000EE' : '#333', cursor: 'pointer'}}>{convertBlank(name)}</div>
                </div>
                <div className="block" title={waitlist ? "Has a waitlist." : "Seats taken / Seats available."} style={waitlist ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                    {handleSeats(seatsAvailable, seatsTaken)}
                </div>
            </div>
        );
    }
};