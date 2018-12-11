import React, { PureComponent, createRef } from 'react';

import { withRouter } from 'react-router-dom';

class Tag extends PureComponent {
    constructor(props) {
        super(props);

        this.recomposer = createRef();

        this.tagMaker();
    }

    tagMaker = () => {
        this.check = [];
        this.tester = this.props.prerequisites;

        this.props.classes.forEach(course => {
            const doesContain = this.props.prerequisites.toLowerCase().indexOf(course.code.toLowerCase());

            if (doesContain !== -1) {
                if (this.props.prerequisites.toLowerCase().search(new RegExp('\\b' + course.code.toLowerCase() + '\\b')) !== -1) {
                    this.check.push(course);
                }
            }
        });

        this.check.forEach(course => {
            this.tester = this.tester.replace(new RegExp(course.code,'ig'), '<span title="Click to take a look!">' + course.code + '</span>');
        });
    }

    tagify = () => {
        const childTags = this.recomposer.current.children;

        for (let i = 0; i < childTags.length; i++) {
            childTags[i].style.cursor = 'pointer';
            childTags[i].addEventListener("click", () => {
                this.props.history.push({
                    pathname: '/' + childTags[i].innerHTML.split(' ').join(''),
                    state: { item: this.props.classes.filter(course => course.code === childTags[i].innerHTML)[0] }
                })
            });
        }
    }

    removeTags = () => {
        const childTags = this.recomposer.current.children;

        for (let i = 0; i < childTags.length; i++) {            
            childTags[i].removeEventListener("click", () => {
                this.props.history.push({
                    pathname: '/' + childTags[i].innerHTML.split(' ').join(''),
                    state: { item: this.props.classes.filter(course => course.code === childTags[i].innerHTML)[0] }
                })
            });
        }
    }

    componentDidMount() {
        this.tagify();
    }
      
    componentWillUnmount() {
        this.removeTags();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.classes.length !== this.props.classes.length) {
            this.tagify();
        }
    }

    render() {
        return (
            <p style={{marginTop: (this.tester === "None") ? '1px' : '7px'}} ref={this.recomposer} className="tagged_class" dangerouslySetInnerHTML={{__html: this.tester}}></p>
        );
    }
}

export default withRouter(Tag);