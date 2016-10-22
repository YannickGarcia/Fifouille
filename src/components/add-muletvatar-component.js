import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { muletsRef } from '../firebase-ref';

class AddMuletvatar extends Component {

    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            submitDisabled: false,
            muletName:'',
            muletUrl:'',
            muletAvailable:'',
            muletUserKey:''
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
        const newMulet = {
            name: this.state.muletName.trim(),
            url: this.state.muletUrl.trim(),
            available: true,
            userKey: 'null'
        };
        if (newMulet.name.length) {
            muletsRef.push(newMulet);
            this.setState({ muletName: '', muletUrl: '', submitDisabled: false });
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
                    title="Add Mulet"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >


                    <form onSubmit={this.handleSubmit} className="TaskInput-form">

                        <TextField
                            hintText=""
                            floatingLabelText="Mulet Name"
                            onChange={(evt) => this.setState({ muletName: evt.target.value })}
                            value={this.state.muletName}
                        /><br />
                        <TextField
                            hintText=""
                            floatingLabelText="Mulet URL"
                            onChange={(evt) => this.setState({ muletUrl: evt.target.value })}
                            value={this.state.muletUrl}
                        /><br />

                    </form>
                </Dialog>
                <FloatingActionButton style={style} onTouchTap={this.handleTouchTap}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default AddMuletvatar;
