import React, { memo } from 'react';

// Custom Components
import {ReactComponent as Cancel} from './icons/cancel.svg';
import {ReactComponent as Search} from './icons/search.svg';

const Toggle = props => (
    <div className={'searchbutton' + props.theme} onClick={props.hasTextInput ? props.clearSearchBox : null} title={props.hasTextInput ? "Clear searchbox" : "Search as you type"}>
        { props.hasTextInput ? <Cancel alt="clear searchbox" />  : <Search alt="search" /> }
    </div>
);

export default memo(Toggle);