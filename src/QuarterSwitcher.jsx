import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';
import { quarter_expansions } from './Utils';

export default class QuarterSwitcher extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            quarter: '',
            showSmall: (window.innerWidth >= 1000 && window.innerWidth <= 1200) || window.innerWidth < 400
        };
    }

    handleWindowResize = () => {
        if ((window.innerWidth >= 1000 && window.innerWidth <= 1200) || window.innerWidth < 400) {
            this.setState({ showSmall: true });
        }

        else {
            this.setState({ showSmall: false });
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    static getDerivedStateFromProps(nextProps, prevState) {        
        if (nextProps.selectedQuarter !== "") {
            if (prevState.showSmall) {
                return {
                    quarter: nextProps.selectedQuarter
                }
            }

            else {
                const quarter = quarter_expansions[nextProps.selectedQuarter.slice(0, 2)];
                const year = '20' + nextProps.selectedQuarter.slice(2, 4);

                return {
                    quarter: quarter + ' ' + year
                }
            }
        }

        return '';
    }

    handleQuarterChange = (event) => {
        event.stopPropagation();
        this.setState({ quarter: event.target.value });
        this.props.changeQuarter(event.target.value);
    }

    render() {
        const { selectedQuarter, quarters } = this.props;
        const { quarter, showSmall } = this.state;
        const { theme } = this.context;

        if (selectedQuarter !== '') {
            return (
                <select title="Select to change quarter" className={'quarter' + theme} value={quarter} onChange={this.handleQuarterChange}>
                    {/* <optgroup label="Other">
                        <option>{'Catalog'}</option>
                    </optgroup>
                    <optgroup label="Quarters"> */}
                        {quarters.map(quart => <option key={quart.abbreviation}>{showSmall ? quart.abbreviation : quart.value}</option>)}
                    {/* </optgroup> */}
                </select>
            );
        }

        return (
            <div title="Select to change quarter" className={'quarter' + theme}>
                <div className={'quarter' + theme + '-loading'}></div>
            </div>
        );
    }
};