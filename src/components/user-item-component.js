import React from 'react';
import Avatar from 'material-ui/Avatar';
// import {grey900, grey600, grey500, cyan500} from 'material-ui/styles/colors';

import { rootRef} from '../firebase-ref';

import {ListItem} from 'material-ui/List';

/*
const myStyle = {
    marginBottom: 10,
    backgroundColor: 'white',
    boxShadow: '0 0 6px rgba(0,0,0,.1)',
    display: 'flex',
    padding: '12px'
};
const subNameStyle = {
    display: 'block',
    color: grey600,
    fontWeight: '400',
    fontSize: '13px'
};
const scoreStyle = {
    color: grey900,
    fontWeight: '700',
    fontSize: '18px'
};
const dateStyle = {
    color: grey500,
    fontWeight: '400',
    fontSize: '11px',
    textAlign: 'center',
    display:'block',
    paddingTop: 2
};
*/

export default class UserItem extends React.Component {

    constructor() {
        super();

        this.state = { usersMulets: [] };
    }

    componentDidMount(){

        const { user } = this.props;
        const muletKey = user.muletKey;
        rootRef.child('muletvatars/' + muletKey).once('value', snap => {
            const usersMulets = [];
            const muletURL = snap.val().url;
            usersMulets.push({muletURL})
            console.log(muletURL);
            this.setState({ usersMulets });
        });

    }

    myFunction(){
        const { usersMulets } = this.state;
        return usersMulets.map((usersMulet) =>
            usersMulet.muletURL
        );
    }

    render() {

        const { user } = this.props;

        return (
            <ListItem
                primaryText={user.username}
                leftAvatar={<Avatar src={this.myFunction()} />}
                secondaryText={user.points}
            />
        );

    }
}