import React, { PureComponent } from 'react';

import { ReactComponent as Dropdown } from '../icons/dropdown.svg';

import { GlobalContext } from '../Context';
import { handleTime, handleLocation, handleSeats, handleDays, convertBlank } from '../Utils';

export default class Row extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            row: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.row !== prevState.row) {
            const available = convertBlank(nextProps.row['seats available']);
            const taken = convertBlank(nextProps.row['seats taken']);
    
            if (taken === 9223372036854776000 || taken === null) {
                return {
                    row: nextProps.row,
                    waitlist: false
                };
            }
    
            else if (taken >= available) {
                return {
                    row: nextProps.row,
                    waitlist: true
                };
            }
    
            else {
                return {
                    row: nextProps.row,
                    waitlist: false
                };
            }
        }
    
        return null;
    }

    hasDropdown = (type, hasSubrows, theme) => {
        if (type === 'header') {
            return (
                <div className={hasSubrows ? (theme === '' ? "dropdown" : "dropdown-dark") : (theme === '' ? "block2" : 'block2-dark')} style={{width: '45px'}}>
                    {hasSubrows && <Dropdown />}
                </div>
            );
        }

        return (
            <div style={{width: '45px'}}></div>
        );
    }

    render() {
        const { type, hasSubrows } = this.props;
        const { row, waitlist } = this.state;
        const { theme } = this.context;

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

        return (
            <div className={type === 'header' ? 'section' + theme : "subinfo-row" + theme}>
                {this.hasDropdown(type, hasSubrows, theme)}
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '90px'}}>
                    {convertBlank(id)}
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '70px'}}>
                    {convertBlank(number)}
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '60px'}}>
                    {convertBlank(meetingType)}
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '200px'}} >
                    <div style={{marginRight: '10px'}}>{handleDays(days)}</div>
                    <div>{handleTime(startTime, endTime)}</div>
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '100px'}}>
                    {handleLocation(building, room)}
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} style={{width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto'}}>
                    <div title="Click to see info about a teacher" style={{fontWeight: '500', padding: '5px', borderRadius: '7px', backgroundColor: theme === '' ? '#EDF4FA' : '#D2E3FB', color: theme === '' ? '#0000EE' : '#333',  cursor: 'pointer'}}>{convertBlank(name)}</div>
                </div>
                <div className={type === 'header' ? "block2" + theme : "block"} title={waitlist ? "If number is 0, it is exactly full. Else it has a waitlist of this number." : "Seats taken / Seats available."} style={waitlist ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                    {handleSeats(seatsAvailable, seatsTaken)}
                </div>
            </div>
        );
    }
};