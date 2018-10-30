import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

export default class Emptypane extends PureComponent {
    static contextType = GlobalContext;

    render() {
        return (
            <div className={"emptypane" + this.context.theme}>
            </div>
        );
    }
};