import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class AddGame extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.superFonction = this.superFonction.bind(this);

        this.state = {
            open: false,
            submitDisabled: true
        };
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

    superFonction(){
        console.log("Baaaam");
        this.setState({
            submitDisabled:false
        });
    }

    render(){
        console.log(this.state)
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
                onTouchTap={this.handleRequestClose}
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
                    <TextField
                        id="text-field-default"
                        defaultValue="Change Speed"
                    />
                    <Checkbox
                        label="Check this out"
                        onCheck={this.superFonction}
                    />
                </Dialog>
                <FloatingActionButton style={style} onTouchTap={this.handleTouchTap}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default AddGame;
