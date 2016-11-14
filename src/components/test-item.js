import React from 'react';

export default class TestItem extends React.Component {

    constructor() {
        super();

    }

    componentDidMount(){
        const { user } = this.props;


    }


    render() {

        const { user } = this.props;

        return (
            <h3>{user.username}</h3>
        );

    }
}