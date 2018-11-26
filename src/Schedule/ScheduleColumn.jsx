import React, { Component } from 'react';
import ScheduleEmptyColumn from './ScheduleEmptyColumn.jsx';

export default class ScheduleColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseHover: false
        };
        
        this.mapOfTimes = []
        for (let index = 0; index < this.props.dayData.length; index++) {
            const data = [this.props.dayData[index]['start time'], this.props.dayData[index]['end time'], index];
            this.mapOfTimes.push(data);
        }

        this.column = [];

        let count = 0;
        let count2 = 0;
        this.toggleBorderBool = true;

        // Iterate through half hours intervals.
        for (let i = 0; i < this.props.intervalWithHalf.length; i++) {
            // Check all times in the mapOfTimes if they start with the time we are looking at.
            for (let j = 0; j < this.mapOfTimes.length; j++) {
                if (this.mapOfTimes[j][0] === this.props.intervalWithHalf[i]) {
                    let numberBlocks = this.numBlocks(this.mapOfTimes[j][0], this.mapOfTimes[j][1]);

                    this.column.push(
                        <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc', textAlign: 'center', height: '30px'}}>
                            <div key={this.props.day + count2} style={{width: 'calc((75vw - 260px)/5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '30px', color: 'white', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px 5px 0 0'}}>{this.props.dayData[this.mapOfTimes[j][2]]['code'] + ' ' + this.props.dayData[this.mapOfTimes[j][2]]['meeting type']}</div>
                        </div>
                    );
                    count++;
                    count2++;
                    this.toggleBorderBool = !this.toggleBorderBool;

                    this.column.push(
                        <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '30px', textAlign: 'center'}}>
                            <div key={this.props.day + count2} style={{width: 'calc((75vw - 260px)/5)', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '30px', color: 'white', fontSize: '14px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>{this.props.dayData[this.mapOfTimes[j][2]]['name']}</div>
                        </div>
                    );
                    count++;
                    count2++;

                    if (numberBlocks <= 2) {
                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '25px', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc', textAlign: 'center'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-1px', width: 'calc((75vw - 260px)/5)', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '26px', color: 'white', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>{this.props.dayData[this.mapOfTimes[j][2]]['building'] + ' ' + this.props.dayData[this.mapOfTimes[j][2]]['room']}</div>
                            </div>
                        );
                        count++;
                        count2++;
                        this.toggleBorderBool = !this.toggleBorderBool;

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '25px', textAlign: 'center'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-1px', width: 'calc((75vw - 260px)/5)', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '26px', color: 'white', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 0 5px 5px'}}>{this.convertTime(this.props.dayData[this.mapOfTimes[j][2]]['start time']) + '-' + this.convertTime(this.props.dayData[this.mapOfTimes[j][2]]['end time'])}</div>
                            </div>
                        );
                        count++;
                        count2++;

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', textAlign: 'center', height: '10px'}}>
                                <div key={this.props.day + count2} style={{width: 'calc((75vw - 200px)/5)', height: '10px', display: 'inline-flex'}}></div>
                            </div>
                        );
                        count++;
                        count2++;
                    }

                    else {
                        if (numberBlocks === 8) {
                            numberBlocks = 6;
                        }

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '25px', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc', textAlign: 'center'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-1px', width: 'calc((75vw - 260px)/5)', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '26px', color: 'white', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'initial'}}>{this.props.dayData[this.mapOfTimes[j][2]]['building'] + ' ' + this.props.dayData[this.mapOfTimes[j][2]]['room']}</div>
                            </div>
                        );
                        count++;
                        count2++;
                        this.toggleBorderBool = !this.toggleBorderBool;

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '25px', textAlign: 'center'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-4px', width: 'calc((75vw - 260px)/5)', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], height: '29px', color: 'white', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'initial'}}>{this.convertTime(this.props.dayData[this.mapOfTimes[j][2]]['start time']) + '-' + this.convertTime(this.props.dayData[this.mapOfTimes[j][2]]['end time'])}</div>
                            </div>
                        );
                        count++;
                        count2++;

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', textAlign: 'center', height: '10px'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-4px', width: 'calc((75vw - 260px)/5)', height: '11px', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], display: 'inline-flex'}}></div>
                            </div>
                        );
                        count++;
                        count2++;

                        // Add the half hour intervals as appropriate.
                        for (let k = 2; k < numberBlocks - 1; k++) {
                            this.column.push(
                                <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc', textAlign: 'center', height: '60px'}}>
                                    <div key={this.props.day + count2} style={{position:'relative', top: '-1px', width: 'calc((75vw - 260px)/5)', display: 'inline-flex', height: '61px', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color']}}></div>
                                </div>
                            );
                            count++;
                            count2++;
                            this.toggleBorderBool = !this.toggleBorderBool;
                        }

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', height: '50px', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc', textAlign: 'center'}}>
                                <div key={this.props.day + count2} style={{position:'relative', top: '-1px', width: 'calc((75vw - 260px)/5)', display: 'inline-flex', height: '51px', backgroundColor: this.props.dayData[this.mapOfTimes[j][2]]['color'], borderRadius: '0 0 5px 5px'}}></div>
                            </div>
                        );
                        count++;
                        count2++;
                        this.toggleBorderBool = !this.toggleBorderBool;

                        this.column.push(
                            <div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', textAlign: 'center', height: '10px'}}>
                                <div key={this.props.day + count2} style={{width: 'calc((75vw - 200px)/5)', height: '10px', display: 'inline-flex'}}></div>
                            </div>
                        );
                        count++;
                        count2++;
                    }

                    // Increment i to the new spot to account for the amount of blocks we have placed.
                    i += numberBlocks;
                }
            }

            if (i < this.props.intervalWithHalf.length) {
                this.column.push(<div key={this.props.day + count} style={{width: 'calc((75vw - 200px)/5)', textAlign: 'center', height: '60px', borderTop: this.toggleBorderBool ?  '1px solid #ccc' : '1px dashed #ccc'}}></div>);
                count++;
                this.toggleBorderBool = !this.toggleBorderBool;
            }
        }
    }

    handleOnMouseEnter = () => {
        this.setState({mouseHover: true});
    }

    handleOnMouseLeave = () => {
        this.setState({mouseHover: false});
    }

    round = (hours, minutes) => {
        if (minutes === 20) {
            return (hours * 2) + 1;
        }

        // End with 50.
        return (hours + 1) * 2;
    }

    numBlocks = (start, finish) => {
        const startSplitTime = start.split(':').map(x => parseInt(x, 10));
        const endSplitTime = finish.split(':').map(x => parseInt(x, 10));

        return this.round((endSplitTime[0] - startSplitTime[0]), (endSplitTime[1] - startSplitTime[1]));
    }

    convertTime = (time) => {
        const timeSplit = time.split(':');
        const hour = Number(timeSplit[0]);

        if (hour > 12) {
            return String(hour - 12) + ':' + timeSplit[1] + 'pm';
        }

        return time + (hour === 12 ? 'pm' : 'am');
    }

    render() {
        const { dayData, theme } = this.props;

        if (dayData.length === 0) {
            return (
                <div 
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: (this.state.mouseHover) ? '#eee' : '#fff'}} 
                    onMouseEnter={this.handleOnMouseEnter} 
                    onMouseLeave={this.handleOnMouseLeave}>
                    <ScheduleEmptyColumn 
                        theme={theme} 
                        intervalWithHalf={this.props.intervalWithHalf}
                    />
                </div>
            );
        }

        return (
            <div 
                style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: (this.state.mouseHover) ? '#eee' : '#fff'}} 
                onMouseEnter={this.handleOnMouseEnter} 
                onMouseLeave={this.handleOnMouseLeave}>
                {this.column}
            </div>
        );
    }
};