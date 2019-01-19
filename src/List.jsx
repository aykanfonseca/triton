import React, { PureComponent, createRef } from 'react';

// Libraries
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getRowHeight, getNumRows } from './Utils';

// Custom Components
import Card from './Card';

const ListItem = ({ style, index, data }) => {
	const [ loading, searchResults, theme, pinned, removePin ] = data;
	const item = searchResults[index];

	return (
		<div style={style}>
			<Card
				loading={loading}
				item={item}
				index={index}
				theme={theme}
				isPinned={pinned.includes(item)}
				removePin={removePin}
			/>
		</div>
	);
};

export default class List extends PureComponent {
	constructor(props) {
		super(props);

		this.list = createRef();
	}

	findIndex = (location, searchResults) => {
		let currLocation = location.pathname;

		if (currLocation === '/') {
			return Number(localStorage.getItem('scrollPos'));
		} else {
			currLocation = currLocation.slice(1);

			for (const index in searchResults) {
				if (this.props.searchResults[index].code.split(' ').join('') === currLocation) {
					localStorage.setItem('scrollPos', Number(index));
					return Number(index);
				}
			}

			return 0;
		}
	};

	render() {
		const { isMobile, theme, pinned, removePin, searchResults, loading } = this.props;

		const listStyle = !isMobile && pinned.length > 0 ? 'list-short' + theme : 'list' + theme;

		const itemData = [ loading, searchResults, theme, pinned, removePin ];

		// this.list.current.scrollToItem(this.findIndex(this.props.location, this.props.searchResults), 'center');

		return (
			<div className={listStyle}>
				<AutoSizer>
					{({ height, width }) => (
						<VariableSizeList
							ref={this.list}
							itemCount={getNumRows(loading, searchResults.length)}
							itemSize={getRowHeight}
							height={height}
							width={width}
							itemData={itemData}
						>
							{ListItem}
						</VariableSizeList>
					)}
				</AutoSizer>
			</div>
		);
	}
}
