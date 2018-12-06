import React, { PureComponent, createRef } from 'react';

// Libraries / Context
import { getRowHeight, getNumRows } from './Utils';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Custom Components
import Card from './Card';

class listItem extends PureComponent {
    render() {
        const { style, index, data } = this.props;
        const [ loading, searchResults, theme, pinned, removePin ] = data;
        const item = searchResults[index];

        return (
            <div style={style}>
                <Card 
                    loading={loading}
                    item={item}
                    index={index}
                    theme={theme}
                    pinned={pinned}
                    removePin={removePin}
                />
            </div>
        );
    }
}

export default class List extends PureComponent {
    // constructor(props) {
    //     super(props);

    //     this.list = createRef();
    // }

    findIndex = (location, searchResults) => {
        let currLocation = location.pathname;

        if (currLocation === '/') {
            return Number(localStorage.getItem('scrollPos'));
        }

        else {
            currLocation = currLocation.slice(1);

            for (const index in searchResults) {
                if (this.props.searchResults[index].code.split(' ').join('') === currLocation) {
                    localStorage.setItem('scrollPos', Number(index));
                    return Number(index);
                }
            }
    
            return 0;
        }
    }

    render() {
        const { isMobile, theme, pinned, removePin, searchResults, loading } = this.props;

        const listStyle = !isMobile && pinned.length > 0 ? 'list-short' + theme : 'list' + theme;

        const itemData = [loading, searchResults, theme, pinned, removePin];

        return (
            <div className={listStyle}>
                <AutoSizer>
                    {({ height, width }) => (
                            <VariableSizeList
                            // ref={this.list}
                            itemCount={getNumRows(loading, searchResults.length)}
                            itemSize={getRowHeight}
                            height={height}
                            width={width}
                            itemData={itemData}
                            // scrollToItem={this.findIndex(location, searchResults), 'center'}
                        >
                            {listItem}
                        </VariableSizeList>
                    )}
                </AutoSizer>
            </div>
        );  
    }
};