import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components.
import Ribbon from './Ribbon';
import Content from './Content';

export default class Rightpane extends PureComponent {
    static contextType = GlobalContext;

    render() {
        console.log(this.props.location.state.item);

        return (
            <div className={"rightpane" + this.context.theme}>
                <Ribbon item={this.props.location.state.item} theme={this.context.theme}/>
                <Content item={this.props.location.state.item} theme={this.context.theme}/>
            </div>
        );
    }
};