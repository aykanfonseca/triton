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
        const { theme } = this.context;
        const { location, isMobile, pinned, addPin, removePin } = this.props;

        return (
            <div className={"rightpane" + theme}>
                <Ribbon 
                    item={location.state.item} 
                    theme={theme} 
                    isMobile={isMobile} 
                    pinned={pinned}
                    addPin={addPin}
                    removePin={removePin}
                />
                <Content 
                    item={location.state.item} 
                    theme={theme} 
                    isMobile={isMobile}
                />
                {isMobile && 
                    <Navigation 
                        theme={theme} 
                        type={location.state.item.code !== undefined ? 'course' : 'teacher'} 
                        addPin={addPin}
                        removePin={removePin}
                        pinned={pinned}
                        item={location.state.item}
                    /> 
                }
            </div>
        );
    }
};