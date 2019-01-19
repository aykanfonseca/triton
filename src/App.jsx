import React, { Component } from 'react';

// Libraries
import { BrowserRouter } from 'react-router-dom';

// Custom Components
import Home from './Home';

const supportsHistory = 'pushState' in window.history;

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: localStorage.getItem('theme') || ''
		};

		localStorage.setItem('scrollPos', 0);
		this.updateMeta();
	}

	changeTheme = () => {
		this.setState(
			{
				theme: this.state.theme === '' ? '-dark' : ''
			},
			this.saveTheme
		);
	};

	saveTheme = () => {
		localStorage.setItem('theme', this.state.theme);

		this.updateMeta();
	};

	updateMeta = () => {
		// Update Favicon.
		const link = document.querySelector("link[rel*='icon']");
		link.href = './favicon' + this.state.theme + '.ico';
		document.head.removeChild(document.getElementById('favicon'));
		document.head.appendChild(link);
	};

	render() {
		return (
			<BrowserRouter forceRefresh={!supportsHistory} basename="/triton">
				<Home theme={this.state.theme} changeTheme={this.changeTheme} />
			</BrowserRouter>
		);
	}
}
