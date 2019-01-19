import React from 'react';

// Libraries
import { withRouter, Link } from 'react-router-dom';

// Icons
import { ReactComponent as Waitlist } from './icons/waitlist.svg';
import { ReactComponent as Pin } from './icons/pin.svg';

const CardIcon = ({ waitlist, theme, item, isPinned, removePin }) => {
	if (isPinned) {
		return (
			<div
				className="card-pin"
				onClick={(e) => {
					e.preventDefault();
					removePin(item);
				}}
				title="Means there's a waitlist."
			>
				<Pin />
			</div>
		);
	} else if (waitlist) {
		return (
			<div className={'card-waitlist' + theme} title="Means there's a waitlist.">
				<Waitlist />
			</div>
		);
	}

	return <div className="card-waitlist-empty-icon"></div>;
};

const setScrollPos = (index) => {
	localStorage.setItem('scrollPos', Number(index));
}

const CourseCard = ({ item, theme, index, isPinned, removePin, location, codeNoSpaces }) => (
	<Link
		to={{ pathname: '/' + codeNoSpaces, state: { item: item, prev: true } }}
		onClick={() => setScrollPos(index)}
		title="A course card."
		className={location === codeNoSpaces ? 'card-active' + theme : 'card' + theme}
	>
		<div className="card-width">
			<p className="card-code">{item.code}</p>
			<p className={'card-title' + theme}>{item.title}</p>
		</div>
		<CardIcon isPinned={isPinned} item={item} waitlist={item.waitlist} theme={theme} removePin={removePin} />
	</Link>
);

const BlankCard = ({ theme }) => (
	<span className={'blankcard' + theme}>
		<div>
			<div className={'blankcard-header' + theme} />
			<div className={'blankcard-subtitle' + theme} />
		</div>
	</span>
);

const Card = ({ loading, item, index, theme, isPinned, removePin = '', location }) => {
	if (loading) {
		return <BlankCard theme={theme} />;
	} else if (item.code) {
		const currLocation = location.pathname.slice(1);

		return (
			<CourseCard
				theme={theme}
				item={item}
				index={index}
				isPinned={isPinned}
				removePin={removePin}
				location={currLocation}
				codeNoSpaces={item.code.split(' ').join('')}
			/>
		);
	}
};

export default withRouter(Card);
