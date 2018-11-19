import React, { PureComponent } from 'react';

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
            text: '',
            placeholder: "Find courses, teachers, units..."
        };
    }

    static getDerivedStateFromProps(_, prevState) {   
        if (window.innerWidth < 230) {
            return {
                text: prevState.text,
                placeholder: "Search..."
            }
        }

        else if (window.innerWidth < 240) {
            return {
                text: prevState.text,
                placeholder: "Type to search"
            }
        }

        else if (window.innerWidth < 300 || 1000 <= window.innerWidth <= 1200) {
            return {
                text: prevState.text,
                placeholder: "Type to search..."
            }
        }

        else if (window.innerWidth < 350) {
            return {
                text: prevState.text,
                placeholder: "Find courses & teachers..."
            }
        }

        return {
            text: prevState.text,
            placeholder: "Find courses, teachers, units..."
        }
    }

    handleWindowResize = () => {
        if (window.innerWidth < 230) {
            this.setState({ placeholder: "Search..." });
        }

        else if (window.innerWidth < 240) {
            this.setState({ placeholder: "Type to search" });
        }

        else if (window.innerWidth < 300 || 1000 <= window.innerWidth <= 1200) {
            this.setState({ placeholder: "Type to search..." });
        }

        else if (window.innerWidth < 350) {
            this.setState({ placeholder: "Find courses & teachers..." });
        }

        this.setState({ placeholder: "Find courses, teachers, units..." });
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleText = (event) => {
        this.setState({ text: event.target.value});
        this.props.filterView(event);
    }

    clearSearchBox = () => {
        this.setState({ text : '' });
        this.props.filterView();
    }

    render() {
        const { theme } = this.context;
        const { quarters, changeQuarter, selectedQuarter } = this.props;
        const { text, placeholder } = this.state;

        return (
            <div className={"searchbox" + theme}>
                <input
                    type="text"
                    title="Type to search"
                    spellCheck="false"
                    value={text}
                    placeholder={placeholder}
                    onChange={this.handleText}
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