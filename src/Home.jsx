import React, { Component } from 'react';

// Libraries / Context
import { Route, Redirect, Switch } from 'react-router-dom';
import { GlobalContext } from './Context';
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
    static contextType = GlobalContext;
    
    constructor(props) {
        super(props);

        this.selectedQuarter = "";
        this.quarters = [];
        this.classes = [];
        this.teachers = [];

        this.state = {
            loading: true,
            pinned: [],
            isMobile: window.innerWidth < 1000,
        };
    }

    addPin = course => {
        this.setState({ pinned: [ ...this.state.pinned, course].sort(naturalSort)})
    }

    removePin = course =>  {
        this.setState(prev => ({ pinned: prev.pinned.filter(val => val !== course) })); 
    };

    clearPins = () => {
        if (this.state.pinned.length > 0) {
            this.setState({ pinned: [] });
        }
    }

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth < 1000 });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);

        this.quarters = fetchQuarters();

        Firebase.database().ref("current").once('value')
            .then(snapshot => this.loadData(snapshot.val()));
    }

    loadData = async (quarter) => {
        this.selectedQuarter = quarter;

        const classPromise = await Firebase.database().ref("quarter/" + quarter).once('value')
            .then(snapshot => this.addClasses(snapshot.val()));

        const teacherPromise = await Firebase.database().ref("quarter/" + quarter + " teachers").once('value')
            .then(snapshot => this.addTeachers(snapshot.val()));

        Promise.all([classPromise, teacherPromise]).then(
            this.finishLoading()
        );
    }

    addClasses = classData => {
        for (const course of Object.values(classData)) {
            const { code, title, units, description, prerequisites, restrictions, waitlist, dei, podcast, ...sections } = course;

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
    }

    addTeachers = teacherData => {
        for (const teacher in teacherData) {
            this.teachers.push({
                teacher: teacher, 
                email: teacherData[teacher][0], 
                classes: teacherData[teacher][1]
            });
        }
    }

    finishLoading = () => {
        localStorage.setItem(this.selectedQuarter, [this.classes, this.teachers]);

        this.setState({ loading: false });
    }

    render() {
        const { loading, pinned, isMobile } = this.state;
        const { theme } = this.context;

        if (isMobile) {
            return (
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} classNames="page" timeout={{ enter: 1000, exit: 1000 }}>
                            <Switch location={location}>
                                <Route exact path='/' render={props => 
                                    <Page background={theme === '' ? '#ccc' : '#333'}> 
                                        <Sidepane 
                                            classes={this.classes} 
                                            teachers={this.teachers} 
                                            quarters={this.quarters} 
                                            selectedQuarter={this.selectedQuarter}
                                            loading={loading} 
                                            pinned={pinned}
                                            // clearPins={this.clearPins}
                                            removePin={this.removePin}
                                            isMobile={isMobile}
                                            {...props}
                                        />
                                    </Page>
                                }/>
                                <Route exact path='/schedule' render={props => 
                                    <Page background={theme === '' ? '#ccc' : '#333'}>
                                        <Schedule 
                                            isMobile={isMobile}
                                            pinned={pinned}
                                            {...props}
                                        />
                                    </Page>
                                }/>
                                <Route path="/:id" render={props => 
                                    <Page background={theme === '' ? '#ccc' : '#333'}>
                                        <Rightpane 
                                            isMobile={isMobile} 
                                            pinned={pinned}
                                            addPin={this.addPin}
                                            removePin={this.removePin} 
                                            {...props}
                                        /> 
                                    </Page>
                                }/>
                                <Redirect from="/:id" to="/" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}/>
            );
        }

        return (
            <div style={{display: 'flex'}}>
                <Switch>
                    <Route path='/schedule' render={props => 
                        <div>
                            <Branding {...this.context} />
                        </div>
                    }/>
                    <Route path='/' render={props => 
                        <Sidepane 
                            classes={this.classes} 
                            teachers={this.teachers}
                            quarters={this.quarters} 
                            selectedQuarter={this.selectedQuarter}
                            loading={loading} 
                            pinned={pinned}
                            removePin={this.removePin}
                            clearPins={this.clearPins}
                            isMobile={isMobile}
                            {...props}
                        />
                    }/>
                </Switch>
                <Switch>
                    <Route path='/schedule' render={props => 
                        <Schedule 
                            isMobile={isMobile}
                            pinned={pinned}
                            {...props}
                        />
                    }/>
                    <Route path="/:id" render={props => 
                        <Rightpane 
                            isMobile={isMobile} 
                            pinned={pinned}
                            addPin={this.addPin}
                            removePin={this.removePin} 
                            {...props}
                        />
                    }/>
                    <Route render={() => (<Emptypane theme={theme} />)} />
                </Switch>
            </div>
        );
    }
};