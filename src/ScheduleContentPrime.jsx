import React, { PureComponent } from 'react';

export default class ScheduleContentPrime extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            empty: false
        };

        this.formatProposal();
    }

    formatProposal = () => {
        // for (const course of this.props.pinned) {
        //     const classCode = course['code'];

        //     // for (const property in course['rest']) {
        //     //     console.log(property);
        //         // if (typeof(course['rest'][property]) === 'object' && property !== 'podcast') {
        //         //     console.log(course['rest'][property]);
        //         // }
        //     }
        // }
    }

    render() {
        return (
            <div>Hi</div>
        );
    }
}