import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { tasksRef } from '../firebase-ref';

class AddGame extends Component {

    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            submitDisabled: true,
            text: ''
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
        const newTask = {
            text: this.state.text.trim(),
            done: false
        };
        if (newTask.text.length) {
            tasksRef.push(newTask);
            this.setState({ text: '', submitDisabled: true });
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
                    title="Add Game"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >

                    <form onSubmit={this.handleSubmit} className="TaskInput-form">
                        <input
                            onChange={(evt) => this.setState({ text: evt.target.value, submitDisabled:false })}
                            value={this.state.text}
                            type="text"
                            placeholder="Add a new task..."
                            required
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

export default AddGame;
