import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { usersRef } from '../firebase-ref';

class AddUser extends Component {

    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            //submitDisabled: true,
            submitDisabled: false,
            //text: '',
            username:'',
            valueMulet: "Mulet 1",
            valueLevel: "Beginner"
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

    handleChangeMulet = (event, index, valueMulet, evt) => this.setState({valueMulet, picture: valueMulet});
    handleChangeLevel = (event, index, valueLevel, evt) => this.setState({valueLevel, level: valueLevel});

    //onChange={(evt) => this.setState({ username: evt.target.value })}

    handleSubmit(event) {
        event.preventDefault();
        const newUser = {
            //text: this.state.text.trim(),
            username: this.state.username.trim(),
            //done: false
            gamesLost: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            level: this.state.valueLevel,
            picture: this.state.valueMulet,
            points:1000
        };
        if (newUser.username.length) {
            usersRef.push(newUser);
            //this.setState({ text: '', submitDisabled: true });
            this.setState({ username: '', submitDisabled: true });
        }
    }

    render(){
        const style = {
            position: 'absolute',
            bottom: 20,
            right: 20,
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
                    title="Add User"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >

                    <form onSubmit={this.handleSubmit} className="TaskInput-form">
                        <TextField
                            hintText=""
                            floatingLabelText="User Name"
                            onChange={(evt) => this.setState({ username: evt.target.value })}
                            value={this.state.username}
                        /><br /><br />
                        <h4>Mulet:</h4>
                        <SelectField value={this.state.valueMulet} onChange={this.handleChangeMulet}>
                            <MenuItem value={"Mulet 1"} primaryText="Mulet 1" />
                            <MenuItem value={"Mulet 2"} primaryText="Mulet 2" />
                            <MenuItem value={"Mulet 3"} primaryText="Mulet 3" />
                            <MenuItem value={"Mulet 4"} primaryText="Mulet 4" />
                            <MenuItem value={"Mulet 5"} primaryText="Mulet 5" />
                        </SelectField><br /><br />
                        <h4>Level</h4>
                        <SelectField value={this.state.valueLevel} onChange={this.handleChangeLevel}>
                            <MenuItem value={"Beginner"} primaryText="Beginner" />
                            <MenuItem value={"Intermediate"} primaryText="Intermediate" />
                            <MenuItem value={"Expert"} primaryText="Expert" />
                        </SelectField>
                    </form>
                </Dialog>
                <FloatingActionButton style={style} onTouchTap={this.handleTouchTap}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default AddUser;
