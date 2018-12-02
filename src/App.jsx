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

		localStorage.setItem('scrollPos', 0);
		this.updateMeta();
	}
	
	changeTheme = () => {
		this.setState({
			theme: this.state.theme === '' ? '-dark' : ''
		}, this.saveTheme);
	}

	saveTheme = () => {
		localStorage.setItem('theme', this.state.theme);

		this.updateMeta();
	}

	updateMeta = () => {
		const link = document.querySelector("link[rel*='icon']");
		link.href = './favicon' + this.state.theme + '.ico';
		document.head.removeChild(document.getElementById('favicon'));
		document.head.appendChild(link);
	}

	render() {
		return (
			<GlobalContext.Provider value={this.state}>
				<Home />
			</GlobalContext.Provider>
		);
	}
};