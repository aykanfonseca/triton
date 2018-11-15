import React, { Component } from 'react';
import SubSection from './SubSection.jsx';

export default class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionsAndFinals: [],
            waitlist: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let sectionsAndFinalsTemp = nextProps.rows.section;

        if (typeof nextProps.rows.final !== "undefined") {
            sectionsAndFinalsTemp = sectionsAndFinalsTemp.concat(nextProps.rows.final);
        }

        if (sectionsAndFinalsTemp !== prevState.sectionsAndFinals) {
            const available = (sectionsAndFinalsTemp[1]['seats available'] !== 'Blank') ? sectionsAndFinalsTemp[1]['seats available'] : null;
            const taken = (sectionsAndFinalsTemp[1]['seats taken'] !== 'Blank') ? sectionsAndFinalsTemp[1]['seats taken'] : null;

            if (taken === 9223372036854776000 || taken === null) {
                return {
                    sectionsAndFinals: sectionsAndFinalsTemp,
                    waitlist: false
                };
            }

            else if (taken >= available) {
                return {
                    sectionsAndFinals: sectionsAndFinalsTemp,
                    waitlist: true
                };
            }

            else {
                return {
                    sectionsAndFinals: sectionsAndFinalsTemp,
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
        const startTime = this.state.sectionsAndFinals[1]['start time'];
        const endTime = this.state.sectionsAndFinals[1]['end time'];

        if (startTime !== "TBA") {
            return this.convertTime(startTime) + ' - ' + this.convertTime(endTime);
        }

        return "TBA";
    }

    handleLocation = () => {
        const building = this.convertBlank(this.state.sectionsAndFinals[1]['building']);
        const room = this.convertBlank(this.state.sectionsAndFinals[1]['room']);

        if (building === 'TBA') {
            return "TBA";
        }

        if (building !== null) {
            return building + " " + room;
        }

        return "TBA";
    }

    handleSeats = () => {
        const available = this.convertBlank(this.state.sectionsAndFinals[1]['seats available']);
        const taken = this.convertBlank(this.state.sectionsAndFinals[1]['seats taken']);

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
        if (this.state.sectionsAndFinals[1]['days'] === '-') {
            return null;
        }

        return this.state.sectionsAndFinals[1]['days'].replace('T', 'Tu').replace('R', 'Th');
    }

    render() {
        return (
            <div className="accor">
                <div style={{display: 'inline-flex', height: '45px', marginTop: '10px', fontSize: '15px', border: '2px solid #ECECFA'}} >
                    <div className="dropdown">
                        <svg width="21" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.328 7.486L17.286.528a1.842 1.842 0 0 1 2.611.004c.723.722.716 1.9.004 2.612l-7.853 7.853a1.837 1.837 0 0 1-1.371.54 1.88 1.88 0 0 1-2.014-.413L.701 3.162c-.73-.73-.734-1.91.004-2.648A1.88 1.88 0 0 1 3.352.51l6.976 6.976z" fill="#FFF" opacity={(this.state.sectionsAndFinals.slice(2).length > 0) ? '1' : '0'}/></svg>
                    </div>
                    <div className="block2" style={{width: '90px', textIndent: '20px'}} >
                        {this.convertBlank(this.state.sectionsAndFinals[1]['id'])}
                    </div>
                    <div className="block2" style={{width: '70px'}} >
                        {this.convertBlank(this.state.sectionsAndFinals[1]['number'])}
                    </div>
                    <div className="block2" style={{width: '60px'}} >
                        {this.convertBlank(this.state.sectionsAndFinals[1]['meeting type'])}
                    </div>
                    <div className="block2" style={{width: '50px'}}>
                        {this.handleDays()}
                    </div>
                    <div className="block2" style={{width: '200px', textIndent: '20px', justifyContent: 'left'}} >
                        {this.handleTime()}
                    </div>
                    <div className="block2" style={{width: '100px', justifyContent: 'left'}} >
                        {this.handleLocation()}
                    </div>
                    <div className="block2" style={{width: '200px', textIndent: '20px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflowX: 'auto', justifyContent: 'left'}} >
                        <a title="Click to see info about a teacher" style={{textDecoration: 'underline', color: '#0000EE', cursor: 'pointer'}} onClick={() => {(this.convertBlank(this.state.sectionsAndFinals[1]['name']) !== null) && this.props.chooseView(this.state.sectionsAndFinals[1]['name'].replace('.',''), 'teacher')}}>{this.convertBlank(this.state.sectionsAndFinals[1]['name'])}</a>
                    </div>
                    <div className="block2" title={(this.state.waitlist) ? "If number is 0, it is exactly full. Else it has a waitlist of this number." : "Seats taken / Seats available."} style={(this.state.waitlist) ? {fontWeight: '500', color: 'red', width: '100px'} : {width: '100px'}}>
                        {this.handleSeats()}

                        {(this.state.waitlist) && 
                            <svg width="11" height="14" style={{marginBottom: '2px', marginLeft: '5px'}} xmlns="http://www.w3.org/2000/svg"><path d="M9.35 6.267h.963c.412 0 .687.266.687.666v6.4c0 .4-.275.667-.688.667H.688A.677.677 0 0 1 0 13.333v-6.4c0-.4.275-.666.688-.666h.962V3.6h1.513v2.667h4.675V3.6H9.35v2.667zm0-2.667h-7.7c0-2 1.788-3.6 3.85-3.6 2.063 0 3.85 1.6 3.85 3.6zm-1.512 0c0-1.2-1.032-2.2-2.338-2.2-1.265 0-2.3.974-2.337 2.2h4.675z" fill="red"/></svg>
                        }
                    </div>
                </div>

                <div className="body" style={{display: 'inline-block'}}>
                    {this.state.sectionsAndFinals.slice(2).map((i, index) => 
                        <SubSection key={index} row={i} chooseView={this.props.chooseView}/>
                    )}
                </div>
            </div>
        );
    }
};