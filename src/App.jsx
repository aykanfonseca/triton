import React, { Component } from 'react';

// Libraries / Context
import { Route, Switch} from 'react-router-dom';
import { GlobalContext } from './Context';

// Custom Components
import Home from './Home';

export default class App extends Component {
	constructor(props) {
		super(props);

		const storedTheme = localStorage.getItem('theme'); 

		this.state = {
			theme: storedTheme !== null ? storedTheme : '',
			changeTheme: this.changeTheme
		};
	} 

	saveTheme = () => {
		localStorage.setItem('theme', this.state.theme);
	}

	changeTheme = () => {
		this.setState({
			theme: this.state.theme === '' ? '-dark' : ''
		}, this.saveTheme);
	}

	render() {
		return (
			<GlobalContext.Provider value={this.state}>
				<Switch>
					{/* <Route 
						exact path='/'
						render={() => <Home data={this.data}/>}
					/>
					<Route 
						path='/help' 
						component={Help}
					/>
					<Route 
						path='/settings' 
						component={Settings}
					/> */}
					<Route component={Home} />
				</Switch>
			</GlobalContext.Provider>
		);
	}
};