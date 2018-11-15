import React, { createRef } from 'react';

export default class Recomposer extends React.Component {
    constructor(props) {
        super(props);

        this.recomposer = createRef();

        this.state = {
            prerequisites: this.props.prerequisites
        };
    }

    tagify = () => {
        let raw = this.recomposer.current.innerHTML;
        this.check = [];

        this.props.classes.forEach((course) => {
            const doesContain = raw.toLowerCase().indexOf(course.code.toLowerCase());
            
            if (doesContain !== -1) {
                if (raw.toLowerCase().search(new RegExp('\\b' + course.code.toLowerCase() + '\\b')) !== -1) {
                    this.check.push(course);
                }
            }
        });

        this.check.forEach(course => {
            raw = raw.replace(new RegExp(course.code,'ig'), `<Link to="/${course.code.split(' ').join('')}">` + course.code + '</Link>');
            // raw = raw.replace(new RegExp(course.code,'ig'), `<a class=${'tag' + this.props.theme} href="${course.code.split(' ').join('')}">` + course.code + "</a>");
        });

        this.setState({prerequisites: raw});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.classes.length !== this.props.classes.length) {
            this.tagify();
        }
    }

    componentDidMount() {
        this.tagify();   
        // this.recomposer.current.innerHTML = capitalizeFirstLetter(this.state.prerequisites);
    }

    render() {
        let htmlObject = document.createElement('p');
        htmlObject.innerHTML = this.state.prerequisites;
        // <p ref={this.recomposer} dangerouslySetInnerHTML={{__html : capitalizeFirstLetter(this.state.prerequisites)}}></p>   

        return (
            <p ref={this.recomposer} dangerouslySetInnerHTML={{__html : capitalizeFirstLetter(this.state.prerequisites)}}></p>   
            // <p ref={this.recomposer}>{htmlObject.innerHTML}</p>   
        );
    }
}