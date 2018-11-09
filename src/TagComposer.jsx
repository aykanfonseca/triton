import React, { PureComponent, createRef } from 'react';

export default class TagMaker extends PureComponent {
    constructor(props) {
        super(props);

        this.recomposer = createRef();

        this.tagMaker();
    }

    tagMaker = () => {
        // console.time("RECOMPOSING");
        this.check = [];
        this.tester = this.props.selected.rest.prerequisites;

        // console.time("---RECOMPOSING Main Block");
        this.props.classes.forEach((course) => {
            const doesContain = this.props.selected.rest.prerequisites.toLowerCase().indexOf(course.code.toLowerCase());

            if (doesContain !== -1) {
                if (this.props.selected.rest.prerequisites.toLowerCase().search(new RegExp('\\b' + course.code.toLowerCase() + '\\b')) !== -1) {
                    this.check.push(course);
                }
            }
        });
        
        // console.timeEnd("---RECOMPOSING Main Block");

        this.check.forEach(course => {
            this.tester = this.tester.replace(new RegExp(course.code,'ig'), '<a title="Click to take a look!">' + course.code + '</a>');
        });

        // Capitalize first letter.
        this.tester = this.tester.charAt(0).toUpperCase() + this.tester.slice(1);

        if (this.tester === "None") {
            this.tester = this.tester + ".";
        }

        // console.timeEnd("RECOMPOSING");
    }

    componentDidMount() {
        const childTags = this.recomposer.current.children;

        for (let i = 0; i < childTags.length; i++) {
            childTags[i].style.cursor = 'pointer';
            childTags[i].addEventListener("click", () => {this.props.chooseView(childTags[i].text, 'class')});
        }
     }
      
     componentWillUnmount() {
        const childTags = this.recomposer.current.children;

        for (let i = 0; i < childTags.length; i++) {
            childTags[i].removeEventListener("click", () => {this.props.chooseView(childTags[i].text, 'class')});
        }
    }

    render() {
        return (
            <div style={{marginBottom: "10px"}}>
                <b>Prerequisites: </b>
                <div style={{marginTop: (this.tester === "None") ? '1px' : '7px'}} ref={this.recomposer} className="tagged_class" dangerouslySetInnerHTML={{__html: this.tester}}></div>
            </div>
        );
    }
}