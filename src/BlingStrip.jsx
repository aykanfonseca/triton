import React, { memo } from 'react';

// Icons
import { ReactComponent as WaitlistIcon } from './icons/tag_waitlist.svg';
import { ReactComponent as DeiIcon } from './icons/tag_dei.svg';
import { ReactComponent as PodcastIcon } from './icons/tag_podcast.svg';
import { ReactComponent as DifficultIcon } from './icons/tag_difficult.svg';

const Waitlist = () => (
    <div className="bling-strip" title="Course is waitlisted" style={{width: '150px', backgroundColor: '#F7F7F7'}}>
        <WaitlistIcon />
        <b>Waitlisted</b>
    </div>
);

const Dei = () => (
    <div className="bling-strip" title="A DEI approved course" style={{width: '100px', backgroundColor: '#EDF4FA'}}>
        <DeiIcon />
        <b>DEI</b>
    </div>
);

const Podcast = () => (
    <div className="bling-strip" title="Has podcasts." style={{width: '160px', backgroundColor: '#FFDDF6'}}>
        <PodcastIcon />
        <b>Podcasts</b>
    </div>
);

const Difficult = () => (
    <div className="bling-strip" title="Has a low grade average or high study hours." style={{width: '160px', backgroundColor: '#F4E8FF'}}>
        <DifficultIcon />
        <b>Difficult</b>
    </div>
);

const BlingStrip = ({item}) => (
    <div className="bling-strip-container">
        { item.waitlist && <Waitlist /> }
        { item.dei && <Dei /> }
        { item.podcast && <Podcast /> }
        {/* <Waitlist />
        <Dei />
        <Podcast />
        <Difficult/> */}
    </div>
);

export default memo(BlingStrip);