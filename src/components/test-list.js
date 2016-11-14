import React from 'react';
import TestItem from './test-item';
import { usersRef } from '../firebase-ref';

class testList extends React.Component {

    constructor(){
        super();
        this.state = { users: [], usersLoading: true}
    }

    componentDidMount(){
        usersRef.orderByChild('points').on('value', snap => {
            const users = [];
            snap.forEach(shot => {
                users.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ users, usersLoading: false });
        })
    }

    renderUsers(){
        const { users } = this.state;
        return users.map((user) => <TestItem key={user.key} user={user} />).reverse();
    }

    render() {
        const { users, usersLoading } = this.state;

        let myUserList;
        if (usersLoading) {
            myUserList = (<div className="gameList-empty">Loading...</div>);
        } else if (users.length) {
            myUserList = (<ul>{this.renderUsers()}</ul>);
        } else {
            myUserList = (<div className="gameList-empty">No Users in da group</div>);
        }

        return (
            <div className="userList">
                {myUserList}
            </div>
        );
    }

}

export default testList;