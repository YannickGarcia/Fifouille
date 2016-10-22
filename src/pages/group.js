import React, { Component } from 'react';
import AddUser from '../components/add-user-component';
/*import AddMuletvatar from '../components/add-muletvatar-component';
import AddGroup from '../components/add-group-component';*/

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
