import React, { PureComponent, createRef } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import QuarterSwitcher from './QuarterSwitcher.jsx';
import {ReactComponent as Cancel} from './icons/cancel.svg';
import {ReactComponent as Search} from './icons/search.svg';

const Toggle = props => (
    <div className={'searchbutton' + props.theme} onClick={props.hasTextInput ? props.clearSearchBox : null} title={props.hasTextInput ? "Clear searchbox" : "Search as you type"}>
        { props.hasTextInput ? <Cancel alt="clear searchbox" />  : <Search alt="search" /> }
    </div>
);

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
        const { theme } = this.context;
        const { quarters, changeQuarter, selectedQuarter } = this.props;
        const { text } = this.state;

        return (
            <div className={"searchbox" + theme}>
                <input
                    type="text"
                    title="Type to search"
                    spellCheck="false"
                    ref={(input) => { this.searchbox = input; }}
                    placeholder="Find courses, teachers, units..." 
                    onKeyUp={this.handleText}
                ></input>
                <QuarterSwitcher 
                    quarters={quarters}
                    changeQuarter={changeQuarter}
                    selectedQuarter={selectedQuarter}
                />
                <Toggle 
                    theme={theme}
                    hasTextInput={text !== ''}
                    clearSearchBox={this.clearSearchBox}
                />
            </div>
        );
    }
};