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
            showSmall: (window.innerWidth >= 1200 && window.innerWidth < 1600) || window.innerWidth < 520
        };
    }

    handleWindowResize = () => {
        if ((window.innerWidth >= 1200 && window.innerWidth < 1600) || window.innerWidth < 520) {
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
        if (this.props.selectedQuarter !== '') {
            return (
                <select title="Select to change quarter" className={'quarter' + this.context.theme} value={this.state.quarter} onChange={this.handleQuarterChange}>
                    <optgroup label="Other">
                        <option>{'Catalog'}</option>
                    </optgroup>
                    <optgroup label="Quarters">
                        {this.props.quarters.map(quarter => <option key={quarter.abbreviation}>{this.state.showSmall ? quarter.abbreviation : quarter.value}</option>)}
                    </optgroup>
                </select>
            );
        }

        return (
            <div title="Select to change quarter" className={'quarter' + this.context.theme}>
                <div className={'quarter' + this.context.theme + '-loading'}></div>
            </div>
        );
    }
};