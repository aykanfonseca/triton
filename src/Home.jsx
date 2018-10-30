import React, { Component } from 'react';

// Libraries / Context
import { Route, Redirect, Switch } from 'react-router-dom';

// Custom Components
import Sidepane from './Sidepane';
import Rightpane from './Rightpane';
import Emptypane from './Emptypane';
import ResponsiveQuery from './ResponsiveQuery';
import Firebase from './firebase.js';

// Utilities
import { naturalSort, fetchQuarters, quarter_abbreviations } from './Utils';

export default class Home extends Component {    
    constructor(props) {
        super(props);

        this.selectedQuarter = "";
        this.quarters = [];
        this.classes = [];
        this.teachers = [];

        this.state = {
            loading: true
        };

        console.log("MOUNTED! - HOME");
    }

    componentDidMount() {
        this.quarters = fetchQuarters();

        // Determines the selected quarter.
        Firebase.database().ref("current").once('value', snapshot => {
            this.selectedQuarter = snapshot.val();
            this.loadData();
        });
    }

    loadData = () => {
        const classData = Firebase.database().ref("quarter/"+ this.selectedQuarter);
        const teacherData = Firebase.database().ref("quarter/" + this.selectedQuarter + " teachers");

        classData.once('value', snapshot => {
            const message = snapshot.val();

            let classes = [];

            for (const key in message) {
                classes.push({
                    code: key, 
                    title: message[key]["title"], 
                    units: message[key]["units"], 
                    rest: message[key], 
                    waitlist: (message[key]["waitlist"] === 'true'), 
                    dei: (message[key]['dei'] === 'true')
                });
            }

            this.classes = classes.sort(naturalSort);

            teacherData.once('value', snapshot => {
                const message = snapshot.val();

                let teachers = [];

                for (const key in message) {
                    teachers.push({
                        teacher: key, 
                        email: message[key][0], 
                        classes: message[key][1]
                    });
                }

                this.teachers = teachers;

                // Save results.
                localStorage.setItem(this.selectedQuarter, [this.classes, this.teachers]);

                this.setState({ loading: false });
            });
        });
    };

    loadDataCatalog = () => {
        // Load in data for classes and teachers and then set loading state to false.
        const dataForCatalog = Firebase.database().ref("catalog/");

        dataForCatalog.once('value', snapshot => {
            const message = snapshot.val();

            let classes = [];
            for (const key in message) {
                classes.push({
                    code: key, 
                    title: message[key]["title"], 
                    units: message[key]["units"], 
                    rest: message[key]
                });
            }

            this.classes = classes.sort(naturalSort);
            this.teachers = [];

            // Save results.
            localStorage.setItem('Catalog', [this.classes, this.teachers]);

            this.setState({ loading: false });
        });
    };

    changeQuarter = (quarter) => {
        this.setState({ loading: true });
        
        if (quarter === 'Catalog') {
            this.selectedQuarter = 'Catalog';
        }

        else {
            const temp = quarter.split(" ");
            
            this.selectedQuarter = quarter_abbreviations[temp[0]] + temp[1].substring(2);
        }

        const data = localStorage.getItem(this.selectedQuarter)

        if (data !== null) {
            this.classes = data[0];
            this.teachers = data[1];
            this.setState({ loading: false });
        }

        else if (this.selectedQuarter === 'Catalog') {
            this.loadDataCatalog();
        }

        else {
            this.loadData();
        }
    };

    render() {
        return (
            <ResponsiveQuery>
                {isMobile => isMobile ? (
                        <Switch>
                            <Route exact path='/' render={props => 
                                <Sidepane 
                                    classes={this.classes} 
                                    quarters={this.quarters} 
                                    selectedQuarter={this.selectedQuarter}
                                    changeQuarter={this.changeQuarter}
                                    teachers={this.teachers} 
                                    loading={this.state.loading} 
                                    {...props} 
                                />
                            }/>
                            <Route path="/:id" component={Rightpane} />
                            <Redirect from="/settings" to="/" />
                            <Redirect from="/:id" to="/" />
                        </Switch>
                    ) : (
                        <Route render={props => (
                            <div style={{display: 'flex'}}>
                                <Sidepane 
                                    classes={this.classes} 
                                    quarters={this.quarters} 
                                    selectedQuarter={this.selectedQuarter}
                                    changeQuarter={this.changeQuarter}
                                    teachers={this.teachers}
                                    loading={this.state.loading} 
                                    {...props} 
                                />
                                <Switch>
                                    <Route path="/:id" component={Rightpane} />
                                    <Route component={Emptypane}/>
                                </Switch>
                            </div>
                        )}/>
                    )
                }
            </ResponsiveQuery>
        );
    }
};