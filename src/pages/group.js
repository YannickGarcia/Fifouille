import React, { Component } from 'react';
import AddUser from '../components/add-user-component';

class Group extends Component {

    render() {
        return (
            <div>
                <h1>This is the group page</h1>
                <AddUser />
            </div>
        );
    }
}

export default Group;
