import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import Branding from './Branding';
import List from './List';
import Searchbox from './Searchbox';
import Navigation from './Navigation';

export default class Sidepane extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        // Necessary for displayResults value to function properly.
        this.initialClasses = [];
        this.initialTeachers = [];
        this.classes = [];
        this.teachers = [];

        this.state = {
            displayResults: []
        };
    }

    setRef = (ref) => {
        this.inputRef = ref;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.displayResults.length === 0 && nextProps.classes.length > 0) {
            return {
                displayResults: nextProps.classes
            }
        }

        return null;
    }

    componentDidUpdate() {
        // Clear quarter switch.
        if (this.props.loading === true && this.state.displayResults.length !== 0) {
            this.setState({ displayResults: [] });
            this.searchbox.value = '';
            this.initialClasses = this.initialTeachers = this.classes = this.teachers = [];
        }

        else if (this.classes.length === 0 && this.state.displayResults.length > 0) {
            this.classes = this.initialClasses = this.props.classes;
            this.teachers = this.initialTeachers = this.props.teachers;
        }
    }

    clearTextInput = () => {
        this.searchbox.value = '';
        this.classes = this.initialClasses;
        this.teachers = this.initialTeachers;
        this.setState({ displayResults: this.classes });
    };

    handleFilter = (isDeleting, input) => {
        const listToFilterForClasses = isDeleting ? this.initialClasses : this.classes;
        const listToFilterForTeachers = isDeleting ? this.initialTeachers : this.teachers;

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
            const isDeleting = (event.keyCode === 8);

            // Doesn't do anything if we type a space.
            if (input !== ' ') {
                this.handleFilter(isDeleting, input);
            }
        }

        else {
            this.setState({ displayResults: this.initialClasses });
            this.classes = this.initialClasses;
            this.teachers = this.initialTeachers;
        }
    };

    render() {
        const { quarters, changeQuarter, selectedQuarter, loading, isMobile, pinned, removePin, addPin } = this.props;
        const { theme } = this.context.theme;
        const showMobileNavigation = isMobile || pinned.length > 0;

        return (
            <div>
                <Branding {...this.context} />
                <Searchbox 
                    quarters={quarters}
                    changeQuarter={changeQuarter}
                    selectedQuarter={selectedQuarter}
                    filterView={this.filterView}
                    setRef={this.setRef}
                />
                <List 
                    searchResults={this.state.displayResults}
                    loading={loading}
                    isMobile={isMobile}
                    pinned={pinned}
                    removePin={removePin}
                    theme={theme}
                />
                { showMobileNavigation && 
                    <Navigation 
                        type='home' 
                        theme={theme} 
                        pinned={pinned} 
                        addPin={addPin}
                        removePin={removePin}
                        isMobile={isMobile}
                    /> 
                } 
            </div>
        );
    }
};