import React, { PureComponent, createRef } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import Toggle from './Toggle.jsx';
import QuarterSwitcher from './QuarterSwitcher.jsx';

export default class Searchbox extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this.searchbox = createRef();
    }

    handleText = (event) => {
        this.setState({ text: event.target.value});

        this.props.filterView(event);
    }

    clearSearchBox = () => {
        this.searchbox.value = ''
        this.setState({ text : '' });
    }

    render() {
        return (
            <div className={"searchbox" + this.context.theme}>
                <input
                    type="text"
                    title="Type to search"
                    spellCheck="false"
                    ref={(input) => { this.searchbox = input; }}
                    placeholder="Find courses, teachers, units..." 
                    onKeyUp={this.handleText}
                ></input>
                <QuarterSwitcher 
                    quarters={this.props.quarters}
                    changeQuarter={this.props.changeQuarter}
                    selectedQuarter={this.props.selectedQuarter}
                />
                <Toggle 
                    theme={this.context.theme}
                    hasTextInput={this.state.text !== ''}
                    clearSearchBox={this.clearSearchBox}
                />
            </div>
        );
    }
};