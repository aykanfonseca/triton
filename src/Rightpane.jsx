import React, { memo } from 'react';

// Custom Components.
import Ribbon from './Ribbon';
import Content from './Content';
import Navigation from './Navigation';

 const Rightpane = ({theme, isMobile, pinned, addPin, removePin, classes}) => (
    <div className={"rightpane" + theme}>
        <Ribbon 
            theme={theme} 
            isMobile={isMobile}
            pinned={pinned}
            addPin={addPin}
            removePin={removePin}
        />
        <Content theme={theme} classes={classes}/>
        {isMobile && 
            <Navigation 
                theme={theme} 
                addPin={addPin}
                removePin={removePin}
                pinned={pinned}
                isMobile='true'
            /> 
        }
    </div>
 );

export default memo(Rightpane);