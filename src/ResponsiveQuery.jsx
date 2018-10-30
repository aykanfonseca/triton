import React, { PureComponent } from 'react';

export default class ResponsiveQuery extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isMobile: window.innerWidth < 1200
        };
    }

    handleWindowResize = () => {
        this.setState({ isMobile: window.innerWidth < 1200 });
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    render() {
        return (
            <>
                {this.props.children(this.state.isMobile)}
            </>
        );
    }
};