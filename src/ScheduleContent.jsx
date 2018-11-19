import React, { PureComponent } from 'react';
import ScheduleFragment from './ScheduleFragment.jsx';
import ScheduleTitles from './ScheduleTitles.jsx';
import ScheduleColumn from './ScheduleColumn.jsx';

import { sortByMilitaryTime, sortByMilitaryTimeEnd, generateIntervals} from './Utils';

export default class ScheduleContent extends PureComponent {
    constructor(props) {
        super(props);

        this.hasData = false;
        this.hasMetrics = false;
        
        // Load the proposal.
        this.loadData(this.calcData());
    }

    calcData = () => {
        const choices = {};

        for (const course of this.props.pinned) {
            const courseOptions = []

            for (const sectionNum in course['sections']) {
                const {seats, ...data} = course['sections'][sectionNum];
                const classProto = [];
                const uniqueIds = [];

                data['section'].forEach(row => {
                    if (row['id'] === 'Blank') {
                        classProto.push(row);
                    }

                    else {
                        uniqueIds.push(row);
                    }
                });

                // Construct a full class (using the class prototype and the unique id section).
                // Format: course class info rows, then unique ID info row, then cape, final, and code.
                const newArray = uniqueIds.map(unique => [...classProto, unique, data['cape'], data['final'], course['code']]);
                courseOptions.push(...newArray);
            }
            
            choices[course['code']] = courseOptions;
        }

        const proposal = [];
        for (const choice in choices) {
            proposal.push(choices[choice][0]);
        }

        return proposal;
    }

    loadData = (proposal) => {
        let colorIndex = 0;
        this.days = {'M': [], 'T': [], 'W': [], 'R': [], 'F': []};
        this.colors = ['#9e7cdc', '#5684e0', '#8ecf5c', '#f4b05a', '#e9624c', '#a47461'];

        // For the proposed schedule, separate the info into individual days.
        for (const course of proposal) {
            for (let i = 0; i < course.length - 3; i++) {
                // Exclude info about seats.
                const {"seats taken": x, "seats available": y, "number": z, ...picked} = course[i];

                // Add the code to the section. Also attach the color.
                picked['code'] = course[course.length - 1];
                picked['color'] = this.colors[colorIndex];

                if (picked['days'] !== '-') {
                    // Iterate through all the days.
                    for (const day of picked['days']) {
                        const {"days": a, ...info} = picked;

                        this.days[day].push(info);
                        this.hasData = true;
                    }
                }
            }
            colorIndex++;
        }

        this.metrics = [0, 0, 0];
        this.finalDays = {'M': [], 'T': [], 'W': [], 'R': [], 'F': []};
        this.finalTitles = {'M' : '', 'T': '', 'W': '', 'R': '', 'F': ''};
        this.numberExclude = 0;
        colorIndex = 0;
        this.scheduleHasFinals = false;

        // Load in metrics.
        for (const course of proposal) {
            const cape = course[course.length - 3];
            const final = course[course.length - 2];

            if (cape !== 'N/A') {
                this.metrics[0] += cape['expected'];
                this.metrics[1] += cape['received'];
                this.metrics[2] += cape['study'];
                this.hasMetrics = true;
            }

            else {
                this.numberExclude++;
            }

            if (final !== undefined) {
                const {"seats taken": x, "seats available": y, "number": z, ...picked} = final;

                // Assign date to the day of week.
                this.finalTitles[picked['days']] = z;

                // Assign course name & color to the info.
                picked['code'] = course[course.length - 1];
                picked['color'] = this.colors[colorIndex];
                colorIndex++;

                const {"days": b, ...info} = picked;

                this.finalDays[b].push(info);
                this.scheduleHasFinals = true;
            }
        }

        let minimum = [];
        let maximum = [];
        let finalMinimum = [];
        let finalMaximum = [];

        if (this.hasData) {
            // Sort each day by the start time of the courses.
            for (const day in this.days) {
                this.days[day].sort(sortByMilitaryTime);
                this.finalDays[day].sort(sortByMilitaryTime);

                // Earliest and latest times for a specific day.
                minimum.push(this.days[day][0]);
                maximum.push(this.days[day][this.days[day].length - 1]);

                finalMinimum.push(this.finalDays[day][0]);
                finalMaximum.push(this.finalDays[day][this.finalDays[day].length - 1]);
            }

            // Gets the latest and earliest times of the proposed schedule respectively. Also gets the latest / earliest for finals schedule.
            const earliest = minimum.sort(sortByMilitaryTime)[0]['start time'];
            const latest = maximum.sort(sortByMilitaryTimeEnd)[0]['end time'];

            const finalEarliest = finalMinimum.sort(sortByMilitaryTime)[0]['start time'];
            const finalLatest = finalMaximum.sort(sortByMilitaryTimeEnd)[0]['end time'];

            const intervals = generateIntervals(earliest, latest, false);
            const finalIntervals = generateIntervals(finalEarliest, finalLatest, true);

            this.interval = intervals[0];
            this.interval2 = intervals[1];

            this.finalInterval = finalIntervals[0];
            this.finalInterval2 = finalIntervals[1];
        }

        else {
            this.interval = ['6:00', '7:00'];
            this.interval2 = ['6:00', '6:30', '7:00', '7:30'];
        }
    }

    render() {
        const { setRef, theme } = this.props;

        return (
            <>
                <div ref={el => setRef(el)}>
                    <ScheduleTitles 
                        isNotFinalSchedule={true}
                        theme={theme}
                    />

                    <div style={{display: 'flex', borderBottom: '3px solid #dedede'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {this.interval.map((time, i) =>
                                <ScheduleFragment theme={theme} key={i} time={time} />
                            )}
                        </div>

                        <ScheduleColumn theme={theme} key={'M'} dayData={this.days['M']} day='M' intervalWithHalf={this.interval2}/>
                        <ScheduleColumn theme={theme} key={'T'} dayData={this.days['T']} day='T' intervalWithHalf={this.interval2}/>
                        <ScheduleColumn theme={theme} key={'W'} dayData={this.days['W']} day='W' intervalWithHalf={this.interval2}/>
                        <ScheduleColumn theme={theme} key={'R'} dayData={this.days['R']} day='R' intervalWithHalf={this.interval2}/>
                        <ScheduleColumn theme={theme} key={'F'} dayData={this.days['F']} day='F' intervalWithHalf={this.interval2}/>
                    </div>
                </div>

                {(this.scheduleHasFinals) ? 
                    <>
                        <h3 style={{marginTop: '30px', marginBottom: '10px'}}>Finals Schedule</h3>
                        <ScheduleTitles isNotFinalSchedule={false} />
                        <div style={{display: 'flex', borderBottom: '3px solid #dedede'}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                    {this.finalInterval.map((time, i) =>
                                        <ScheduleFragment theme={theme} key={i} time={time} />
                                    )}
                                </div> 

                                <ScheduleColumn theme={theme} key={'M'} dayData={this.finalDays['M']} day='M' intervalWithHalf={this.finalInterval2}/>
                                <ScheduleColumn theme={theme} key={'T'} dayData={this.finalDays['T']} day='T' intervalWithHalf={this.finalInterval2}/>
                                <ScheduleColumn theme={theme} key={'W'} dayData={this.finalDays['W']} day='W' intervalWithHalf={this.finalInterval2}/>
                                <ScheduleColumn theme={theme} key={'R'} dayData={this.finalDays['R']} day='R' intervalWithHalf={this.finalInterval2}/>
                                <ScheduleColumn theme={theme} key={'F'} dayData={this.finalDays['F']} day='F' intervalWithHalf={this.finalInterval2}/>
                        </div>
                    </>

                    :

                    <div style={{display: 'flex', marginTop: '110px', borderBottom: '3px solid #dedede'}}>
                            
                    </div>
                }
            </>
        );
    }
};