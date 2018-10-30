import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import Branding from './Branding';
import List from './List';
import Searchbox from './Searchbox';

export default class Sidepane extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        // Necessary for displayResults value to function properly.
        this.initialClasses = [];
        this.initialTeachers = [];
        this.classes = [];
        this.teachers = [];
        this.suggestions = [];

        this.state = {
            displayResults: []
        };

        console.log("MOUNTED! - SIDEPANE")
    }

    setRef = (ref) => {
        this.inputRef = ref;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log('%cDeriving', 'font-weight: bold');
        if (prevState.displayResults.length === 0 && nextProps.classes.length > 0) {
            // console.log('----Doing something with Deriving');
            return {
                displayResults: nextProps.classes
            }
        }

        return null;
    }

    componentDidUpdate() {
        // console.log('%cUpdate', 'font-weight: bold');

        // Clear quarter switch.
        if (this.props.loading === true && this.state.displayResults.length !== 0) {
            // console.log('----Clearing fields');
            this.setState({ displayResults: [] });
            this.searchbox.value = '';
            this.initialClasses = this.initialTeachers = this.classes = this.teachers = this.suggestions = [];
        }

        else if (this.classes.length === 0 && this.state.displayResults.length > 0) {
            // console.log('----Doing something with Update');
            this.classes = this.initialClasses = this.props.classes;

            // For now, classes are randomly picked.
            this.suggestions = [this.classes[Math.floor(Math.random() * this.classes.length)]['code'],
                                this.classes[Math.floor(Math.random() * this.classes.length)]['code'],
                                this.classes[Math.floor(Math.random() * this.classes.length)]['code']];
    
            // Rerenders teachers if they are needed.
            this.teachers = this.initialTeachers = this.props.teachers;
        }
    }

    clearTextInput = () => {
        this.searchbox.value = '';
        this.classes = this.initialClasses;
        this.teachers = this.initialTeachers;
        this.setState({ displayResults: this.classes });
    };

    handleFilter = (handleBackSpace, input) => {
        const listToFilterForClasses = (handleBackSpace === true) ? this.initialClasses : this.classes;
        const listToFilterForTeachers = (handleBackSpace === true) ? this.initialTeachers : this.teachers;

        // Search by pinned.
        if (input.indexOf('pinned') !== -1) {

            if (this.props.pinned.length > 0) {
                this.setState({ displayResults: this.initialClasses.filter(course => this.props.pinned.includes(course)) });
            }
        }

        // Search by units. 
        else if (input.indexOf('unit') !== -1 || input.indexOf('units') !== -1) {
            const number = input.match(/\d+/);

            if (number !== null) {
                this.setState({ displayResults: this.initialClasses.filter(({units}) => units.indexOf(number) !== -1) });
            }
        }

        // Search by classes and teachers.
        else {
            this.classes = listToFilterForClasses.filter(({code, title}) => code.toLowerCase().indexOf(input) !== -1 || title.toLowerCase().indexOf(input) !== -1);
    
            if (this.classes !== this.state.displayResults) {
                this.teachers = listToFilterForTeachers.filter(({teacher}) => teacher.toLowerCase().replace(',', '').indexOf(input) !== -1);
    
                if (this.classes.length < 5) {
                    this.setState({ displayResults: this.classes.concat(this.teachers.slice(0, 7)) });
                }
    
                else {
                    this.setState({ displayResults: this.classes });
                }
            }
        }
    }

    filterView = (event) => {
        if (event.target.value !== "") {
            const input = event.target.value.trim().toLowerCase();

            // Doesn't do anything if we type a space. Provides 14% more optimized overall rendering.
            if (input !== ' ') {
                // If the last key pressed was the delete key, refilter from initial classes and teachers.
                this.handleFilter((event.keyCode === 8), input);
            }
        }

        else { // Provides a 5x faster rendering.
            this.setState({ displayResults: this.initialClasses });
            this.classes = this.initialClasses;
            this.teachers = this.initialTeachers;
        }
    };

    render() {
        return (
            <div>
                <Branding {...this.context} />
                <Searchbox 
                    quarters={this.props.quarters}
                    changeQuarter={this.props.changeQuarter}
                    selectedQuarter={this.props.selectedQuarter}
                    filterView={this.filterView}
                    // setRef={this.setRef}
                />
                <List 
                    searchResults={this.state.displayResults}
                    loading={this.props.loading}
                />
            </div>
        );
    }
};