import React, { PureComponent, createRef } from 'react';

// Libraries / Context
import { GlobalContext } from './Context';

// Custom Components
import Row from './Row';

export default class Sections extends PureComponent {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };

        this.acc = createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.sections !== prevState.sections) {
            return {
                sections: Object.values(nextProps.sections)
            };
        }

        return null;
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
                <Row isHeader hasSubrows={hasSubrows} row={rowsData.section[1]} />
                {hasSubrows && this.buildSubrows(rowsData)}
            </div>
        );
    }

    buildSubrows = rowsData => {
        let subrows = rowsData.section.slice(2);

        if (rowsData.final !== undefined) {
            subrows = subrows.concat(rowsData.final);
        }

        return (
            <div className={"body" + this.context.theme} style={{display: 'inline-block'}}>
                {subrows.map((subrow, index) => 
                    <Row row={subrow} key={index} />
                )}
            </div>
        );
    }

    render() {
        return (
            <>      
                <h1>Sections</h1>
                <div className='section-container'>
                    <div style={{display: 'inline-flex', height: '25px', fontWeight: '600'}}>
                        <div style={{width: '45px'}}></div>
                        <div className="block" style={{width: '90px'}}>ID</div>
                        <div className="block" style={{width: '70px'}}>Section</div>
                        <div className="block" style={{width: '60px'}}>Type</div>
                        <div className="block" style={{width: '200px'}}>When</div>
                        <div className="block" style={{width: '100px'}}>Where</div>
                        <div className="block" style={{width: '250px'}}>Teacher</div>
                        <div className="block" style={{width: '100px'}}>Seats</div>
                    </div>  

                    <div ref={this.acc}>
                        {this.state.sections.map((rowsData, index) => this.buildRows(rowsData, index))}
                    </div>
                </div>      
            </>
        );
    }
};