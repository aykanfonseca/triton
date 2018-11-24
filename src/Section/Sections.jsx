import React, { PureComponent, createRef } from 'react';
import Row from './Row.jsx';
import SectionTitles from './SectionTitles.jsx';

import { GlobalContext } from '../Context';

export default class Sections extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };

        this.acc = createRef();
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            sections: Object.values(nextProps.sections)
        };
    }

    componentDidMount() {
        this.addClick();
    }
    
    addClick = () => {
        for (let child of this.acc.current.children) {
            child.lastChild.onclick = (e) => { // Makes sure all body stuff (not header) is not clickable.
                if (e.srcElement.nodeName !== 'A') { // Stop all events except something that is an a tag.
                    e.stopPropagation();
                }
            }
            
            child.onclick = () => {
                child.classList.toggle("active");
                child.firstChild.firstChild.classList.toggle('active');
            }
        }
    }

    buildRows = (rowsData, index) => {
        const hasSubrows = rowsData.section.slice(2).length > 0 || rowsData.final !== undefined;

        return (
            <div className="accor" key={index}>
                <Row type="header" hasSubrows={hasSubrows} row={rowsData.section[1]} />   
                {hasSubrows && this.buildSubrows(rowsData)}
            </div>
        );
    }

    buildSubrows = rowsData => {
        let subrows = rowsData.section.slice(2)

        if (rowsData.final !== undefined) {
            subrows = subrows.concat(rowsData.final);
        }

        return (
            <div className={"body" + this.context.theme} style={{display: 'inline-block'}}>
                {subrows.map((subrow, index) => 
                    <Row type="subrow" row={subrow} key={index} />
                )}
            </div>
        );
    }

    render() {
        return (
            <>      
                <h1>Sections</h1>
                <div style={{overflow: 'scroll'}}>
                    <SectionTitles />

                    <div ref={this.acc}>
                        {this.state.sections.map((rowsData, index) => this.buildRows(rowsData, index))}
                    </div>
                </div>      
            </>
        );
    }
};