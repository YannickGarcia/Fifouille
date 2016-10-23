import React, { Component } from 'react';
import AddUser from '../components/add-user-component';

import UserList from '../components/user-list-component';
/*import AddMuletvatar from '../components/add-muletvatar-component';
import AddGroup from '../components/add-group-component';*/

class Group extends Component {

    render() {
        return (
            <div>
                <UserList />
                <AddUser />
            </div>
        );
    }
}

export default Group;
