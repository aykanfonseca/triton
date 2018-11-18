import React, { Component } from 'react';

export default class SubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            row: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.row !== prevState.row) {
            const available = (nextProps.row['seats available'] !== 'Blank') ? nextProps.row['seats available'] : null;
            const taken = (nextProps.row['seats taken'] !== 'Blank') ? nextProps.row['seats taken'] : null;

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

    convertBlank = (arg) => {
        return (arg !== 'Blank') ? arg : null;
    }

    convertTime = (time) => {
        const timeSplit = time.split(':');
        const hour = Number(timeSplit[0]);

        if (hour > 12) {
            return String(hour - 12) + ':' + timeSplit[1] + 'pm';
        }

        return time + (hour === 12 ? 'pm' : 'am');
    }

    handleTime = () => {
        const startTime = this.state.row['start time'];
        const endTime = this.state.row['end time'];

        if (startTime !== "TBA") {
            return this.convertTime(startTime) + ' - ' + this.convertTime(endTime);
        }

        return "TBA";
    }

    handleLocation = () => {
        const building = this.convertBlank(this.state.row['building']);
        const room = this.convertBlank(this.state.row['room']);

        if (building === 'TBA') {
            return "TBA";
        }

        if (building !== null) {
            return building + " " + room;
        }

        return "TBA";
    }

    handleSeats = () => {
        const available = this.convertBlank(this.state.row['seats available']);
        const taken = this.convertBlank(this.state.row['seats taken']);

        if (taken === 9223372036854776000) {
            return "Unlimited"
        }

        if (taken === null) {
            return null;
        }

        if (taken >= available) {
            return taken + " / " + available;
        }

        else {
            return taken + " / " + available;
        }
    }

    handleDays = () => {
        if (this.state.row['days'] === '-') {
            return null;
        }

        if (this.state.row['meeting type'] === 'FI') {
            return this.state.row['days'];
        }

        return this.state.row['days'].replace('T', 'Tu').replace('R', 'Th');
    }

    render() {
        const { theme } = this.props;

        return(
            <div className={"subinfo-row" + theme} style={{display: 'flex', height: '40px', fontSize: '15px'}}>
                <div style={{width: '45px'}}></div>
                <div className="block" style={{width: '90px'}} >
                    {this.convertBlank(this.state.row['id'])}
                </div>
                <div className="block" style={{width: '70px'}} >
                    {this.convertBlank(this.state.row['number'])}
                </div>
                <div className="block" style={{width: '60px'}} >
                    {this.convertBlank(this.state.row['meeting type'])}
                </div>
                <div className="block" style={{width: '200px'}} >
                    <div style={{marginRight: '10px'}}>{this.handleDays()}</div>
                    <div>{this.handleTime()}</div>
                </div>
                <div className="block" style={{width: '100px'}} >
                    {this.handleLocation()}
                </div>
                <div className="block" style={{width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto'}} >
                    <div title="Click to see info about a teacher!" style={{fontWeight: '500', padding: '5px', borderRadius: '7px', backgroundColor: (this.props.theme === '' ? '#EDF4FA' : '#D2E3FB'), color: (this.props.theme === '' ? '#0000EE' : '#333'), cursor: 'pointer'}}>{this.convertBlank(this.state.row['name'])}</div>
                </div>
                <div className="block" title={(this.state.waitlist) ? "Has a waitlist." : "Seats taken / Seats available."} style={(this.state.waitlist) ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                    {this.handleSeats()}
                </div>
            </div>
        );
    }
};