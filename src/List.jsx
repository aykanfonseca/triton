import React, { Component, createRef } from 'react';

// Libraries / Context
import { AutoSizer, List as VirtualList } from 'react-virtualized';

// Custom Components
import Card from './Card';

// Utilities
import { getRowHeight, getNumRows } from './Utils';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.list = createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.theme !== prevProps.theme) {
            this.list.current.forceUpdateGrid();
        }

        else if (this.props.pinned.length !== prevProps.pinned.length) {
            this.list.current.forceUpdateGrid();
        }

        else if (this.props.location !== prevProps.location) {
            this.list.current.forceUpdateGrid();
        }
    }

    rowRenderer = ({key, index, style}) => {
        const item = this.props.searchResults[index];

        return (  
            <div key={key} style={style}>
                <Card 
                    loading={this.props.loading}
                    key={key.code || key.teacher || index}
                    item={item}
                    theme={this.props.theme}
                    pinned={this.props.pinned}
                    removePin={this.props.removePin}
                    location={this.props.location.pathname.slice(1)}
                />
            </div>        
        );
    }

    render() {
        const { isMobile, theme, pinned, searchResults, loading } = this.props;

        const listStyle = !isMobile && pinned.length > 0 ? 'list-short' + theme : 'list' + theme;

        return (
            <div className={listStyle}>
                <AutoSizer>
                    {({ height, width}) => (
                        <VirtualList
                            ref={this.list}
                            height={height}
                            width={width}
                            rowCount={getNumRows(loading, searchResults.length)}
                            rowHeight={getRowHeight(height, width, loading, searchResults.length)}
                            rowRenderer={this.rowRenderer}
                            loading={loading}
                        />  
                    )}
                </AutoSizer>
            </div>
        );  
    }
};