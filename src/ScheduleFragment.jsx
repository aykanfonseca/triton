import React, { PureComponent, Fragment } from 'react';

export default class ScheduleFragment extends PureComponent {
    convertTime = (time) => {
        const timeSplit = time.split(':');
        const hour = Number(timeSplit[0]);

        if (hour > 12) {
            return String(hour - 12) + ':' + timeSplit[1] + 'pm';
        }

        return time + (hour === 12 ? ' pm' : ' am');
    }

    render() {
        return (
            <Fragment>
                <div style={{width: '100px', textAlign: 'center', height: '60px', borderTop: '1px solid #ccc', borderRight: '1px solid #ddd'}}>{this.convertTime(this.props.time)}</div>
                <div style={{width: '100px', textAlign: 'center', height: '60px', borderTop: '1px dashed #ccc', borderRight: '1px solid #ddd'}}></div>
            </Fragment>
        );
    }
}