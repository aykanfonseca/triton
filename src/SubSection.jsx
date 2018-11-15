import React, { Component } from 'react';

export default class SubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionRow: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.row !== prevState.sectionRow) {
            const available = (nextProps.row['seats available'] !== 'Blank') ? nextProps.row['seats available'] : null;
            const taken = (nextProps.row['seats taken'] !== 'Blank') ? nextProps.row['seats taken'] : null;

            if (taken === 9223372036854776000 || taken === null) {
                return {
                    sectionRow: nextProps.row,
                    waitlist: false
                };
            }

            else if (taken >= available) {
                return {
                    sectionRow: nextProps.row,
                    waitlist: true
                };
            }

            else {
                return {
                    sectionRow: nextProps.row,
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
        const startTime = this.state.sectionRow['start time'];
        const endTime = this.state.sectionRow['end time'];

        if (startTime !== "TBA") {
            return this.convertTime(startTime) + ' - ' + this.convertTime(endTime);
        }

        return "TBA";
    }

    handleLocation = () => {
        const building = this.convertBlank(this.state.sectionRow['building']);
        const room = this.convertBlank(this.state.sectionRow['room']);

        if (building === 'TBA') {
            return "TBA";
        }

        if (building !== null) {
            return building + " " + room;
        }

        return "TBA";
    }

    handleSeats = () => {
        const available = this.convertBlank(this.state.sectionRow['seats available']);
        const taken = this.convertBlank(this.state.sectionRow['seats taken']);

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
        if (this.state.sectionRow['days'] === '-') {
            return null;
        }

        if (this.state.sectionRow['meeting type'] === 'FI') {
            return this.state.sectionRow['days'];
        }

        return this.state.sectionRow['days'].replace('T', 'Tu').replace('R', 'Th');
    }

    render() {
        return(
            <div className="subinfo-row" style={{display: 'flex', height: '35px', fontSize: '15px'}}>
                <div style={{width: '45px'}}></div>
                <div className="block" style={{width: '90px', textIndent: '20px'}} >
                    {this.convertBlank(this.state.sectionRow['id'])}
                </div>
                <div className="block" style={{width: '70px'}} >
                    {this.convertBlank(this.state.sectionRow['number'])}
                </div>
                <div className="block" style={{width: '60px'}} >
                    {this.convertBlank(this.state.sectionRow['meeting type'])}
                </div>
                <div className="block" style={{width: '50px'}}>
                    {this.handleDays()}
                </div>
                <div className="block" style={{width: '200px', textIndent: '20px', justifyContent: 'left'}} >
                    {this.handleTime()}
                </div>
                <div className="block" style={{width: '100px', justifyContent: 'left'}} >
                    {this.handleLocation()}
                </div>
                <div className="block" style={{width: '200px', textIndent: '20px', overflowX: 'auto', justifyContent: 'left'}} >
                    <a title="Click to see info about a teacher!" style={{textDecoration: 'underline', color: '#0000EE', cursor: 'pointer'}} onClick={() => {(this.convertBlank(this.state.sectionRow['name']) !== null) && this.props.chooseView(this.state.sectionRow['name'].replace('.',''), 'teacher')}}>{this.convertBlank(this.state.sectionRow['name'])}</a>
                </div>
                <div className="block" title={(this.state.waitlist) ? "Has a waitlist." : "Seats taken / Seats available."} style={(this.state.waitlist) ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                    {this.handleSeats()}

                    {(this.state.waitlist) && 
                        <svg width="11" height="14" style={{marginBottom: '2px', marginLeft: '5px'}} xmlns="http://www.w3.org/2000/svg"><path d="M9.35 6.267h.963c.412 0 .687.266.687.666v6.4c0 .4-.275.667-.688.667H.688A.677.677 0 0 1 0 13.333v-6.4c0-.4.275-.666.688-.666h.962V3.6h1.513v2.667h4.675V3.6H9.35v2.667zm0-2.667h-7.7c0-2 1.788-3.6 3.85-3.6 2.063 0 3.85 1.6 3.85 3.6zm-1.512 0c0-1.2-1.032-2.2-2.338-2.2-1.265 0-2.3.974-2.337 2.2h4.675z" fill="red"/></svg>
                    }
                </div>
            </div>
        );
    }
};