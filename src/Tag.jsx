import React, { PureComponent } from 'react';

// Libraries / Context
import { Link } from 'react-router-dom';

export default class Tag extends PureComponent {
    constructor(props) {
        super(props);

        this.taggedText = this.props.text;
    }

    buildText = () => {
        // <Link to={{ pathname: "/" + course.code.split(' ').join(''), state: {item: course} }} title="Click to take a look!" className={'tag' + theme}>course.code</Link>



        // this.check.forEach(course => {
        //     this.taggedText = this.taggedText.replace(new RegExp(course.code,'ig'), );
        // });
    }

    componentDidMount() {
        this.check = [];

        this.props.classes.forEach((course) => {
            const doesContain = this.props.text.toLowerCase().indexOf(course.code.toLowerCase());

            if (doesContain !== -1) {
                if (this.props.text.toLowerCase().search(new RegExp('\\b' + course.code.toLowerCase() + '\\b')) !== -1) {
                    this.check.push(course);
                }
            }
        });
    }
    
    render() {
        return (
            <p>{this.taggedText}</p>
        );
    }
}