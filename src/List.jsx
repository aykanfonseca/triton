import React, { Component, createRef } from 'react';

// Libraries / Context
import { AutoSizer, List as VirtualList } from 'react-virtualized';
import { GlobalContext } from './Context';
import { debounce } from './Utils';

// Custom Components
import BlankCard from './BlankCard';
import Card from './Card';

// class ScrollSpeed {
//     clear = () => {
//         this.lastPosition = null;
//         this.delta = 0;
//     };
    
//     getScrollSpeed(scrollOffset) {
//         if (this.lastPosition != null) {
//             this.delta = scrollOffset - this.lastPosition;
//         }
        
//         this.lastPosition = scrollOffset;
        
//         window.clearTimeout(this._timeout);
//         this._timeout = window.setTimeout(this.clear, 50);
        
//         return this.delta;
//     }
// }

// const SPEED_THRESHOLD = 70; // Tweak this to whatever feels right for your app
// const SCROLL_DEBOUNCE_DURATION = 100; // In milliseconds

class List extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.list = createRef();

        this.state = {
            isScrollingFast: false
        };
    }

    // getScrollSpeed = new ScrollSpeed().getScrollSpeed;

    // handleScroll = ({scrollTop}) => {
    //     // scrollSpeed represents the number of pixels scrolled since the last scroll event was fired
    //     const scrollSpeed = Math.abs(this.getScrollSpeed(scrollTop));

    //     if (scrollSpeed >= SPEED_THRESHOLD) {
    //         this.setState({ isScrollingFast: true });
    //     }

    //     else {
    //         this.setState({ isScrollingFast: false });   
    //     }

    //     // Since this method is debounced, it will only fire once scrolling has stopped for the duration of SCROLL_DEBOUNCE_DURATION
    //     this.handleScrollEnd();
    // }
    
    // handleScrollEnd = debounce(() => {
    //     if (this.state.isScrollingFast) {
    //         this.setState({ isScrollingFast: false });
    //     }
    // }, SCROLL_DEBOUNCE_DURATION);

    componentDidUpdate(prevProps) {
        if (this.props.context !== prevProps.context) {
            this.list.current.forceUpdateGrid();
        }

        if (this.props.pinned.length !== prevProps.pinned.length) {
            this.list.current.forceUpdateGrid();
        }
    }

    rowRenderer = ({key, index, style}) => {
        let content = '';

        if (this.props.loading) {
            content = <BlankCard 
                        theme={this.context.theme} 
                        key={index} 
                    />;
        }

        else if (this.props.searchResults.length === 0) {
            content = (
                <div className={'empty-list' + this.context.theme}>
                    <div>
                        <svg width="85" height="117" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="99.073%" id="a"><stop stop-color="#B0F08C" offset="0%"/><stop stop-color="#72DCD4" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M25.574 99.735c.01.112.014.225.014.34 0 .185-.008.416-.024.683a4.31 4.31 0 0 1-.154 1.673c-.439 3.673-1.71 9.565-4.066 9.565s-3.627-5.892-4.066-9.565a4.26 4.26 0 0 1-.154-1.673 12.61 12.61 0 0 1-.024-.627l-.03.001a4.248 4.248 0 0 0-4.214-3.743 4.248 4.248 0 0 0-4.212 4.773C8.801 105.276 9.31 117 4.37 117c-5.508 0-4.244-14.577-4.244-16.926V37.99h.239C2.624 16.636 20.654 0 42.563 0 64.47 0 82.502 16.636 84.76 37.989H85v48.47c0 5.205-3.625 9.596-8.533 10.72a4.248 4.248 0 0 1-4.198 4.879 4.248 4.248 0 0 1-4.244-4.308l-.37.017a4.244 4.244 0 0 0-3.874-2.512 4.246 4.246 0 0 0-4.018 2.881l-.298.014c-.267 5.663-1.191 12.535-4.171 12.611-2.925.075-3.87-6.574-4.156-12.222l-.196.01a4.247 4.247 0 0 0-4.136-3.294 4.248 4.248 0 0 0-4.206 3.684l-.188.008c.098.36.15.737.15 1.127 0 2.349-1.9 4.253-4.243 4.253a4.248 4.248 0 0 1-4.18-4.993l-.264.013a4.247 4.247 0 0 0-4.044-2.958 4.247 4.247 0 0 0-4.146 3.34l-.11.006z" fill="url(#a)"/><path d="M60 69c0-5.523-7.835-10-17.5-10S25 63.477 25 69" fill="#FFF"/><ellipse fill="#FFF" cx="60" cy="36.5" rx="8" ry="8.5"/><ellipse fill="#FFF" cx="22" cy="36.5" rx="8" ry="8.5"/></g></svg>
                    </div>
                    <div>
                        <h2>Nothing to display</h2>
                        <p>Try these suggestions:</p>
                    </div>
                    <div>
                        <span title="Click here for help and more information!" className={"list-help" + this.props.context}>
                            <p>Or press</p>
                            <div>
                                <svg width="18" height="27" xmlns="http://www.w3.org/2000/svg"><path d="M7 21h3.4c.6 0 1 .5 1 1v3.3c0 .6-.4 1-1 1H7.1a1 1 0 0 1-1-1V22c0-.5.4-1 1-1zM0 8.3c.2-1.3.4-2.3.7-3 .4-1 1-2 1.7-2.8A8 8 0 0 1 5.2.7a11.3 11.3 0 0 1 7.8 0c1.2.5 2 1 2.8 1.7a6.3 6.3 0 0 1 2 4.5 7 7 0 0 1-3 6.1L13 14.3 12 15.4c-.4.5-.6 1.1-.7 1.8v.4c0 .6-.5 1-1 1H7.3a1 1 0 0 1-1-1V17A7.4 7.4 0 0 1 8 12.6l1.4-1.3 1.3-1c.4-.4.8-.8 1-1.2.3-.5.4-1 .4-1.6 0-1.2-.3-2-.8-2.5A3 3 0 0 0 9 4.2a3.3 3.3 0 0 0-2.8 1.4c-.3.4-.5 1-.7 1.5l-.2 1.3c0 .3-.2.5-.5.5H.6a.5.5 0 0 1-.5-.6z" fill="#fff"/></svg>
                            </div>
                            <p>for help.</p>
                        </span>
                    </div>
                </div>);
        }

        else {            
            const item = this.props.searchResults[index];
            content = <Card 
                        key={key.code || key.teacher}
                        item={item}
                        theme={this.context.theme}
                        isScrollingFast={this.state.isScrollingFast}
                        index={index}
                        pinned={this.props.pinned}
                        removePin={this.props.removePin}
                    />;
        }

        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    }

    getNumRows = () => {
        if (this.props.loading) {
            return 100;
        }
        
        else if (this.props.searchResults.length === 0) {
            return 1;
        }
        
        return this.props.searchResults.length;
    }

    getRowHeight = (height, width) => {
        if (!this.props.loading && this.props.searchResults.length === 0) {
            return height;
        }

        else if (width < 400) {
            return 80;
        }

        return 95;
    }

    render() {
        return (
            <div className={this.props.isMobile ? 'list' + this.props.context : this.props.pinned.length > 0 ? 'list-short' + this.props.context : 'list' + this.props.context}>
                <AutoSizer>
                    {({ height, width}) => (
                        <VirtualList
                            ref={this.list}
                            height={height}
                            width={width}
                            rowCount={this.getNumRows()}
                            rowHeight={this.getRowHeight(height, width)}
                            rowRenderer={this.rowRenderer}
                            loading={this.props.loading}
                            // onScroll={this.handleScroll}
                        />  
                    )}
                </AutoSizer>
            </div>
        );   
    }
}

const mapContext = props => (
    <GlobalContext.Consumer>
        {({theme}) => (
            <List 
                {...props}
                context={theme}
            />
        )}
    </GlobalContext.Consumer>
)

export default mapContext;

// import React, { memo, PureComponent, createRef } from 'react';

// // Libraries / Context
// import { GlobalContext } from './Context';
// import { AutoSizer, List as VirtualList } from 'react-virtualized';

// // Custom Components
// import BlankCard from './BlankCard';
// import Card from './Card';

// export default class List extends PureComponent {
//     static contextType = GlobalContext;

//     constructor(props) {
//         super(props);

//         this.list = createRef();
//     }

//     render() {
//         return (
//             <div className={'list' + this.context.theme}>
//                 <AutoSizer>
//                     {({ height, width })} => (
//                         <VirtualList
//                             ref={this.list}
//                             height={height}
//                             width={width}
//                             rowCount={}
//                         />
//                     )}
//                 </AutoSizer>
//             </div>
//         );
//     }
// }