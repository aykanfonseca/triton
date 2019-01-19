import React, { Fragment } from 'react';

import { withRouter } from 'react-router-dom';

// Custom Components
import MetricBox from './MetricBox';
import Sections from './Sections';
import BlingStrip from './BlingStrip';
import Tag from './Tag';

const DescriptionBox = ({ item, classes }) => (
	<Fragment>
		<h1>Description</h1>
		<p>{item.description}</p>
		<b>Prerequisites:</b>
		<Tag prerequisites={item.prerequisites} classes={classes} key={item.code} />
		<b>Restrictions:</b>
		<p>{item.restrictions === '' ? 'None.' : item.restrictions}</p>
	</Fragment>
);

const Content = ({ location, theme, classes }) => {
	const item = location.state.item;

	return (
		<div className={'content' + theme}>
			<BlingStrip item={item} />
			<DescriptionBox item={item} classes={classes} />
			<MetricBox code={item.code} sections={item.sections} />
			<Sections theme={theme} key={item.code} sections={item.sections} />
		</div>
	);
};

export default withRouter(Content);
