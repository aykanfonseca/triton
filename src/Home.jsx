import React, { Component } from 'react';

// Libraries / Context
import { Route, Redirect, Switch } from 'react-router-dom';
import { GlobalContext } from './Context';

// Custom Components
import Sidepane from './Sidepane';
import Rightpane from './Rightpane';
import Schedule from './Schedule';
import Emptypane from './Emptypane';
import Firebase from './firebase.js';

// Utilities
import { naturalSort, fetchQuarters } from './Utils';

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
            width: window.innerWidth,
        };
    }

    addPin = (course) => {
        this.setState({ pinned: [ ...this.state.pinned, course].sort(naturalSort)})
    }

    removePin = (course) =>  {
        this.setState(prev => ({ pinned: prev.pinned.filter(val => val !== course) })); 
    };

    clearPins = () => {
        if (this.state.pinned.length > 0) {
            this.setState({pinned: []});
        }
    }

    handleWindowResize = () => {
        this.setState({ width: window.innerWidth });
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

    addClasses = (message) => {
        const classData = Object.values(message);

        for (const course of classData) {
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

    addTeachers = (message) => {
        for (const teacher in message) {
            this.teachers.push({
                teacher: teacher, 
                email: message[teacher][0], 
                classes: message[teacher][1]
            });
        }
    }

    finishLoading = () => {
        localStorage.setItem(this.selectedQuarter, [this.classes, this.teachers]);

        this.setState({ loading: false });
    }

    render() {
        const { loading, pinned, width } = this.state;
        const isMobile = width < 1200;

        if (isMobile) {
            return (
                <Switch>
                    <Route exact path='/' render={props => 
                        <Sidepane 
                            classes={this.classes} 
                            teachers={this.teachers} 
                            quarters={this.quarters} 
                            selectedQuarter={this.selectedQuarter}
                            loading={loading} 
                            pinned={pinned}
                            clearPins={this.clearPins}
                            removePin={this.removePin}
                            isMobile={isMobile}
                            {...props}
                        />
                    }/>
                    <Route exact path='/schedule' render={props => 
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
                    <Redirect from="/:id" to="/" />
                </Switch>
            );
        }

        return (
            <div style={{display: 'flex'}}>
                <Switch>
                    <Route path='/schedule' render={props => 
                        <div style={{width: '25vw', height: '100vh', backgroundColor: '#ccc'}}>Schedule</div>
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
                    <Route render={() => (<Emptypane theme={this.context.theme} />)} />
                </Switch>
            </div>
        );
    }
};