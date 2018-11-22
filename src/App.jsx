import React, { Component } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import Home from './Home';

export default class App extends Component {
	constructor(props) {
		super(props);

		const storedTheme = localStorage.getItem('theme') || ''; 

		this.state = {
			theme: storedTheme,
			changeTheme: this.changeTheme
		};
	}
	
	changeTheme = () => {
		this.setState({
			theme: this.state.theme === '' ? '-dark' : ''
		}, this.saveTheme);
	}

	saveTheme = () => {
		localStorage.setItem('theme', this.state.theme);
	}

	render() {
		return (
			<GlobalContext.Provider value={this.state}>
				<Home />
			</GlobalContext.Provider>
		);
	}
};