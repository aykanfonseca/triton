import React, { Component } from 'react';

// Libraries
import { Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { naturalSort, fetchQuarters } from './Utils';

// Custom Components
import Sidepane from './Sidepane';
import Rightpane from './Rightpane';
import Schedule from './Schedule/Schedule';
import Emptypane from './Emptypane';
import Branding from './Branding';
import Firebase from './firebase.js';
import Page from './Page';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.selectedQuarter = '';
		this.quarters = [];
		this.classes = [];

		this.state = {
			loading: true,
			pinned: [],
			isMobile: window.innerWidth < 1000
		};
	}

	addPin = (course) => {
		this.setState({ pinned: [ ...this.state.pinned, course ].sort(naturalSort) });
	};

	removePin = (course) => {
		this.setState((prev) => ({ pinned: prev.pinned.filter((val) => val !== course) }));
	};

	clearPins = () => {
		if (this.state.pinned.length > 0) {
			this.setState({ pinned: [] });
		}
	};

	handleWindowResize = () => {
		this.setState({ isMobile: window.innerWidth < 1000 });
	};

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);

		this.quarters = fetchQuarters();

		// const url = "https://winter-2019-rd.firebaseio.com/current.json";

		// fetch(url, {headers: {method: "GET", mode: "no-cors"}}).then(val => val.json()).then(data => this.loadData(data));

		// const url2 =
		// 	'https://firebasestorage.googleapis.com/v0/b/winter-test-c46cc.appspot.com/o/check2.txt.gz?alt=media&token=8730da2b-872b-4ded-b13c-5eb1e11eda46';

		// fetch(url2, { headers: { method: 'GET', mode: 'no-cors', 'Access-Control-Allow-Methods': '*' } })
		// 	.then((val) => val.json())
		// 	.then((data) => console.log(data));

		Firebase.database().ref('current').once('value').then((snapshot) => this.loadData(snapshot.val()));
	}

	// classPromise = (quarter) => {
	//     const classDataUrl = "https://winter-2019-rd.firebaseio.com/quarters/" + quarter + ".json";

	//     return fetch(classDataUrl, {headers: {method: "GET", mode: "no-cors"}})
	//         .then(data => this.addClasses(data));
	// }

	loadData = async (quarter) => {
		this.selectedQuarter = quarter;

		const classPromise = await Firebase.database()
			.ref('quarter/' + quarter)
			.once('value')
			.then((snapshot) => this.addClasses(snapshot.val()));

		Promise.all([ classPromise ]).then(this.finishLoading());
	};

	addClasses = (classData) => {
		for (const course of Object.values(classData)) {
			const {
				code,
				title,
				units,
				description,
				prerequisites,
				restrictions,
				waitlist,
				dei,
				podcast,
				...sections
			} = course;

			this.classes.push({
				code: code,
				title: title,
				units: units,
				description: description,
				prerequisites: prerequisites,
				restrictions: restrictions,
				waitlist: waitlist === 'true',
				dei: dei === 'true',
				sections: sections
			});
		}

		this.classes = this.classes.sort(naturalSort);
	};

	finishLoading = () => {
		localStorage.setItem(this.selectedQuarter, this.classes);

		this.setState({ loading: false });
	};

	render() {
		const { loading, pinned, isMobile } = this.state;
		const { theme, changeTheme } = this.props;

		if (isMobile) {
			return (
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition key={location.pathname} classNames="page" timeout={900}>
								<Switch location={location}>
									<Route
										exact
										path="/"
										render={(props) => (
											<Page background={theme === '' ? '#ccc' : '#333'}>
												<Sidepane
													classes={this.classes}
													quarters={this.quarters}
													selectedQuarter={this.selectedQuarter}
													loading={loading}
													pinned={pinned}
													removePin={this.removePin}
													isMobile={isMobile}
													theme={theme}
													changeTheme={changeTheme}
													{...props}
												/>
											</Page>
										)}
									/>
									<Route
										exact
										path="/schedule"
										render={(props) => (
											<Page background={theme === '' ? '#ccc' : '#333'}>
												<Schedule
													theme={theme}
													isMobile={isMobile}
													pinned={pinned}
													{...props}
												/>
											</Page>
										)}
									/>
									<Route
										path="/:id"
										render={(props) => (
											<Page background={theme === '' ? '#ccc' : '#333'}>
												<Rightpane
													isMobile={isMobile}
													pinned={pinned}
													addPin={this.addPin}
													removePin={this.removePin}
													theme={theme}
													classes={this.classes}
													{...props}
												/>
											</Page>
										)}
									/>
									<Redirect from="/:id" to="/" />
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			);
		}

		return (
			<div style={{ display: 'flex' }}>
				<Switch>
					<Route
						path="/schedule"
						render={(props) => (
							<div>
								<Branding theme={theme} changeTheme={changeTheme} />
							</div>
						)}
					/>
					<Route
						path="/"
						render={(props) => (
							<Sidepane
								classes={this.classes}
								quarters={this.quarters}
								selectedQuarter={this.selectedQuarter}
								loading={loading}
								pinned={pinned}
								removePin={this.removePin}
								isMobile={isMobile}
								theme={theme}
								changeTheme={changeTheme}
								{...props}
							/>
						)}
					/>
				</Switch>
				<Switch>
					<Route
						path="/schedule"
						render={(props) => <Schedule isMobile={isMobile} theme={theme} pinned={pinned} {...props} />}
					/>
					<Route
						path="/:id"
						render={(props) => (
							<Rightpane
								isMobile={isMobile}
								pinned={pinned}
								addPin={this.addPin}
								removePin={this.removePin}
								theme={theme}
								classes={this.classes}
								{...props}
							/>
						)}
					/>

					<Route render={() => <Emptypane theme={theme} />} />
				</Switch>
			</div>
		);
	}
}
