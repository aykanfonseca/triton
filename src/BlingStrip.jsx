import React from 'react';

// Icons
import { ReactComponent as WaitlistIcon } from './icons/bling_waitlist.svg';
import { ReactComponent as DeiIcon } from './icons/bling_dei.svg';
import { ReactComponent as PodcastIcon } from './icons/bling_podcast.svg';
import { ReactComponent as DifficultIcon } from './icons/bling_difficult.svg';

const BlingStripIcon = ({ title, width = '160px', color, children }) => (
	<div className="bling-strip-icon" title={title} style={{ backgroundColor: color, width: width }}>
		{children}
	</div>
);

const Waitlist = () => (
	<BlingStripIcon width="150px" color="#F7F7F7" title="Course is waitlisted">
		<WaitlistIcon />
		<b>Waitlisted</b>
	</BlingStripIcon>
);

const Dei = () => (
	<BlingStripIcon width="100px" color="#EDF4FA" title="A DEI-approved course">
		<DeiIcon />
		<b>DEI</b>
	</BlingStripIcon>
);

const Podcast = () => (
	<BlingStripIcon color="#FFDDF6" title="Has podcasts">
		<PodcastIcon />
		<b>Podcasts</b>
	</BlingStripIcon>
);

const Difficult = () => (
	<BlingStripIcon color="#F4E8FF" title="Low grade average or high study hours">
		<DifficultIcon />
		<b>Difficult</b>
	</BlingStripIcon>
);

const BlingStrip = ({ item }) => (
	<div className="bling-strip">
		{item.waitlist && <Waitlist />}
		{item.dei && <Dei />}
		{item.podcast && <Podcast />}
		{item.difficult && <Difficult />}
	</div>
);

export default BlingStrip;
