import React, { Component } from 'react';

export default class ResponsiveQuery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth
        };
    }

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth });
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    render() {
        return this.props.children(this.state.width);
    }
};