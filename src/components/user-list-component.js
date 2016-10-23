import React from 'react';
import UserItem from './user-item-component';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { usersRef, muletsRef } from '../firebase-ref';

class userList extends React.Component {

    constructor(){
        super();
        this.state = { users: [], usersLoading: true}
    }

    componentDidMount(){
        usersRef.on('value', snap => {
            const users = [];
            snap.forEach(shot => {
                users.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ users, usersLoading: false });
        })
    }

    renderUsers(){
        const { users } = this.state;
        return users.map((user) => <UserItem key={user.key} user={user} />);
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

                <List>
                    <Subheader>Group Players</Subheader>
                    {myUserList}
                </List>
            </div>
        );
    }

}

export default userList;