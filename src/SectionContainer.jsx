import React, { PureComponent, createRef } from 'react';
import Section from './Section.jsx';
import SectionTitles from './SectionTitles.jsx';

export default class SectionContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            code: ''
        };

        this.acc = createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.code !== nextProps.code) {
            const sectionsTemp = [];

            for (let property in nextProps.rest) {
                if (typeof(nextProps.rest[property]) === 'object' && property !== 'podcast') {
                    sectionsTemp.push(nextProps.rest[property]);
                }
            }

            return {
                sections: sectionsTemp,
                code: nextProps.code
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

    render() {
        return (
            <>      
                <h1>Sections</h1>      
                <SectionTitles />

                <div ref={this.acc} onClick={this.handleClick}>
                    {this.state.sections.map((i, index) => 
                        <Section key={index} rows={i}/>
                    )}
                </div>
            </>
        );
    }
};