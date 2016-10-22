import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { groupsRef } from '../firebase-ref';

class AddGroup extends Component {

    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            submitDisabled: false,
            groupName:'',
            groupUrl:'tobeset',
            groupUsers:'tobeset',
            groupPic:'tobeset'
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }



    handleSubmit(event) {
        event.preventDefault();
        const newGroup = {
            name: this.state.groupName.trim(),
            url: this.state.groupUrl.trim(),
            pic: this.state.groupPic,
            users: this.state.groupUsers
        };
        if (newGroup.name.length) {
            groupsRef.push(newGroup);
            this.setState({ groupName: '', submitDisabled: true});
        }
    }

    render(){
        const style = {
            position: 'absolute',
            bottom: 20,
            left: 20,
            zIndex: '100'
        };


        const standardActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.submitDisabled}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return(
            <div>
                <Dialog
                    open={this.state.open}
                    title="Add Group"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >


                    <form onSubmit={this.handleSubmit} className="TaskInput-form">

                        <TextField
                            hintText=""
                            floatingLabelText="Group Name"
                            onChange={(evt) => this.setState({ groupName: evt.target.value })}
                            value={this.state.groupName}
                        />

                    </form>
                </Dialog>
                <FloatingActionButton style={style} onTouchTap={this.handleTouchTap}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default AddGroup;
