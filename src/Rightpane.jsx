import React, { PureComponent } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components.
import Ribbon from './Ribbon';
import Content from './Content';
import Navigation from './Navigation';

export default class Rightpane extends PureComponent {
    static contextType = GlobalContext;

    render() {
        return (
            <div className={"rightpane" + this.context.theme}>
                <Ribbon 
                    item={this.props.location.state.item} 
                    theme={this.context.theme} 
                    isMobile={this.props.isMobile} 
                    addPin={this.props.addPin}
                    removePin={this.props.removePin}
                    pinned={this.props.pinned}
                />
                <Content 
                    classes={this.props.classes} 
                    item={this.props.location.state.item} 
                    theme={this.context.theme} 
                    isMobile={this.props.isMobile}
                />
                {this.props.isMobile && 
                    <Navigation 
                        theme={this.context.theme} 
                        type={this.props.location.state.item.code !== undefined ? 'course' : 'teacher'} 
                        addPin={this.props.addPin}
                        removePin={this.props.removePin}
                        pinned={this.props.pinned}
                        item={this.props.location.state.item}
                    /> 
                }
            </div>
        );
    }
};