import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components.
import Navigation from './Navigation';
import ScheduleContent from './ScheduleContent';

export default class Schedule extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            reference: ''
        };
    }

    setRef = (ref) => {
        this.setState({reference: ref});
    }

    render() {
        const { theme } = this.context;
        const { isMobile, pinned } = this.props;

        return (
            <div className={"rightpane" + theme}>
                <div className={"ribbon" + theme}>
                    <div className={"title" + theme}>
                        <h1>Schedule</h1>
                    </div>
                </div>
                <div className={"content" + theme}>
                    <ScheduleContent pinned={pinned} setRef={this.setRef} theme={theme} />
                </div>
                {isMobile && 
                    <Navigation 
                        theme={theme} 
                        type="schedule" 
                        pinned={pinned}
                        reference={this.state.reference}
                    /> 
                }
            </div>
        );
    }
};