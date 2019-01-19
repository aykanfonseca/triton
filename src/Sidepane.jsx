import React, { Component } from 'react';

// Custom Components
import Branding from './Branding';
import List from './List';
import Searchbox from './Searchbox';
import Navigation from './Navigation';

export default class Sidepane extends Component {
	constructor(props) {
		super(props);

		// Necessary for displayResults value to function properly.
		this.initialClasses = [];
		this.classes = [];

		this.state = {
			displayResults: []
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.displayResults.length !== this.state.displayResults.length) {
			return true;
		} else if (nextProps.loading !== this.props.loading) {
			return true;
		} else if (nextProps.pinned !== this.props.pinned) {
			return true;
		} else if (nextProps.location !== this.props.location) {
			return true;
		} else if (nextProps.theme !== this.props.theme) {
			return true;
		}

		return false;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.displayResults.length === 0 && nextProps.classes.length > 0) {
			return {
				displayResults: nextProps.classes
			};
		}

		return null;
	}

	componentDidUpdate() {
		// Clear quarter switch.
		if (this.props.loading === true && this.state.displayResults.length !== 0) {
			this.setState({ displayResults: [] });
			this.searchbox.value = '';
			this.initialClasses = this.classes = [];
		} else if (this.classes.length === 0 && this.state.displayResults.length > 0) {
			this.classes = this.initialClasses = this.props.classes;
		}
	}

	clearTextInput = () => {
		this.searchbox.value = '';
		this.classes = this.initialClasses;
		this.setState({ displayResults: this.classes });
	};

	handleFilter = (isDeleting, input) => {
		const listToFilterForClasses = isDeleting ? this.initialClasses : this.classes;

		// Search by units.
		if (input.indexOf('unit') !== -1 || input.indexOf('units') !== -1) {
			const number = input.match(/\d+/);

			if (number !== null) {
				this.setState({
					displayResults: this.initialClasses.filter(({ units }) => units.indexOf(number) !== -1)
				});
			}
		} else {
			// Search by classes.
			this.classes = listToFilterForClasses.filter(
				({ code, title }) =>
					code.toLowerCase().indexOf(input) !== -1 || title.toLowerCase().indexOf(input) !== -1
			);

			if (this.classes !== this.state.displayResults) {
				this.setState({ displayResults: this.classes });
			}
		}
	};

	filterView = (event = '') => {
		// localStorage.setItem('scrollPos', 0);

		if (event !== '' && event.target.value !== '') {
			const input = event.target.value.trim().toLowerCase();
			const isDeleting = event.keyCode === 8;

			// Doesn't do anything if we type a space.
			if (input !== ' ') {
				this.handleFilter(isDeleting, input);
			}
		} else {
			this.setState({ displayResults: this.initialClasses });
			this.classes = this.initialClasses;
		}
	};

	render() {
		const {
			quarters,
			changeQuarter,
			selectedQuarter,
			loading,
			isMobile,
			pinned,
			removePin,
			addPin,
			location,
			theme,
			changeTheme
		} = this.props;
		const showNavigation = isMobile || pinned.length > 0;

		return (
			<div>
				<Branding theme={theme} changeTheme={changeTheme} />
				<Searchbox
					quarters={quarters}
					changeQuarter={changeQuarter}
					selectedQuarter={selectedQuarter}
					filterView={this.filterView}
					theme={theme}
				/>
				<List
					searchResults={this.state.displayResults}
					loading={loading}
					isMobile={isMobile}
					pinned={pinned}
					removePin={removePin}
					theme={theme}
					location={location}
				/>
				{showNavigation && (
					<Navigation
						type="home"
						theme={theme}
						pinned={pinned}
						addPin={addPin}
						removePin={removePin}
						isMobile={isMobile}
					/>
				)}
			</div>
		);
	}
}
