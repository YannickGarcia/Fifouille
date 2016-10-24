import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { gamesRef, timeRef, usersRef, rootRef } from '../firebase-ref';

const styleList = {
    width: '100%'
}

class AddGame extends Component {

    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            submitDisabled: false,
            p1Key:'',
            valuep1Key:'',
            p1Team:'',
            p1Score:'',
            p1Winner:'popo',
            p1Draw:'',
            p1Loser:'',
            p2Key:'',
            valuep2Key:'',
            p2Team:'',
            p2Score:'',
            p2Winner:'',
            p2Draw:'',
            p2Loser:'',
            users: []
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

    componentDidMount(){
        usersRef.on('value', snap => {
            const users = [];
            snap.forEach(shot => {
                users.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ users });
        })
    }

    renderUsers(){
        const { users } = this.state;
        return users.map((user) => <MenuItem key={user.key} value={user.key} primaryText={user.username} />);
    }


    handleChangeP1Key = (event, index, valuep1Key, evt) => this.setState({valuep1Key, p1Key: valuep1Key});
    handleChangeP2Key = (event, index, valuep2Key, evt) => this.setState({valuep2Key, p2Key: valuep2Key});

    handleSubmit(event) {
        event.preventDefault();

        const p1Score = this.state.p1Score.trim();
        const p2Score = this.state.p2Score.trim();

        //console.log(p1Score);
        if(p1Score > p2Score){
            this.setState({ p1Winner: true, p1Draw: false, p1Loser: false, p2Winner: false, p2Draw: false, p2Loser: true }, function () {
                this.pushTheGame();
                this.p1Wins();

            });

        }else if(p1Score === p2Score){
            this.setState({ p1Winner: false, p1Draw: true, p1Loser: false, p2Winner: false, p2Draw: true, p2Loser: false }, function () {
                this.pushTheGame();
                this.isDraw();
            });
        }else if(p1Score < p2Score){
            this.setState({ p1Winner: false, p1Draw: false, p1Loser: true, p2Winner: true, p2Draw: false, p2Loser: false }, function () {
                this.pushTheGame();
                this.p2Wins();
            });
        }


    }

    p1Wins(){
        // Update des datas de P1
        rootRef.child('users/' + this.state.p1Key).once('value', snap => {
            const p1Wins = (snap.val().gamesWon) + 1;
            const p1Games = (snap.val().gamesPlayed) + 1;
            const p1GoalsFor = (snap.val().goalsFor) + Number(this.state.p1Score.trim());
            const p1GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p2Score.trim());
            rootRef.child('users/' + this.state.p1Key).update({gamesWon: p1Wins, gamesPlayed: p1Games, goalsFor: p1GoalsFor, goalsAgainst: p1GoalsAgainst});
            //console.log(p1Wins);
        });

        // Update des datas de P2
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            const p2Lost = (snap.val().gamesLost) + 1;
            const p2Games = (snap.val().gamesPlayed) + 1;
            const p2GoalsFor = (snap.val().goalsFor) + Number(this.state.p2Score.trim());
            const p2GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p1Score.trim());
            rootRef.child('users/' + this.state.p2Key).update({gamesLost: p2Lost, gamesPlayed: p2Games, goalsFor: p2GoalsFor, goalsAgainst: p2GoalsAgainst});
            //console.log(p1Wins);
        });
    }

    p2Wins(){
        // Update des datas de P2
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            const p2Wins = (snap.val().gamesWon) + 1;
            const p2Games = (snap.val().gamesPlayed) + 1;
            const p2GoalsFor = (snap.val().goalsFor) + Number(this.state.p2Score.trim());
            const p2GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p1Score.trim());
            rootRef.child('users/' + this.state.p2Key).update({gamesWon: p2Wins, gamesPlayed: p2Games, goalsFor: p2GoalsFor, goalsAgainst: p2GoalsAgainst});
            //console.log(p1Wins);
        });

        // Update des datas de P1
        rootRef.child('users/' + this.state.p1Key).once('value', snap => {
            const p1Lost = (snap.val().gamesLost) + 1;
            const p1Games = (snap.val().gamesPlayed) + 1;
            const p1GoalsFor = (snap.val().goalsFor) + Number(this.state.p1Score.trim());
            const p1GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p2Score.trim());
            rootRef.child('users/' + this.state.p1Key).update({gamesLost: p1Lost, gamesPlayed: p1Games, goalsFor: p1GoalsFor, goalsAgainst: p1GoalsAgainst});
            //console.log(p1Wins);
        });
    }

    isDraw(){
        // Update des datas de P2
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            const p2Draw = (snap.val().gamesDraw) + 1;
            const p2Games = (snap.val().gamesPlayed) + 1;
            const p2GoalsFor = (snap.val().goalsFor) + Number(this.state.p2Score.trim());
            const p2GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p1Score.trim());
            rootRef.child('users/' + this.state.p2Key).update({gamesDraw: p2Draw, gamesPlayed: p2Games, goalsFor: p2GoalsFor, goalsAgainst: p2GoalsAgainst});
            //console.log(p1Wins);
        });

        // Update des datas de P1
        rootRef.child('users/' + this.state.p1Key).once('value', snap => {
            const p1Draw = (snap.val().gamesDraw) + 1;
            const p1Games = (snap.val().gamesPlayed) + 1;
            const p1GoalsFor = (snap.val().goalsFor) + Number(this.state.p1Score.trim());
            const p1GoalsAgainst = (snap.val().goalsAgainst) + Number(this.state.p2Score.trim());
            rootRef.child('users/' + this.state.p1Key).update({gamesDraw: p1Draw, gamesPlayed: p1Games, goalsFor: p1GoalsFor, goalsAgainst: p1GoalsAgainst});
            //console.log(p1Wins);
        });
    }

    pushTheGame(){
        const newGame = {
            p1Key:this.state.valuep1Key,
            p1Team:this.state.p1Team.trim(),
            p1Score:this.state.p1Score.trim(),
            p1Winner:this.state.p1Winner,
            p1Draw:this.state.p1Draw,
            p1Loser:this.state.p1Loser,
            p2Key:this.state.valuep2Key,
            p2Team:this.state.p2Team.trim(),
            p2Score:this.state.p2Score.trim(),
            p2Winner:this.state.p2Winner,
            p2Draw:this.state.p2Draw,
            p2Loser:this.state.p2Loser,
            timeStamp:timeRef,
            groupKey: '-KUh54HpGOGP850b2Tpu'
        };
        if (newGame.p1Team.length) {
            gamesRef.push(newGame);
            this.setState({
                p1Team: '',
                p2Team: '',
                p1Score: '',
                p2Score: '',
                submitDisabled: false
            });
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
                label="Add Game"
                primary={true}
                disabled={this.state.submitDisabled}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return(
            <div>
                <Dialog
                    open={this.state.open}
                    contentStyle={styleList}
                    title="Add Game"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >

                    <form onSubmit={this.handleSubmit.bind(this)} className="TaskInput-form">
                        <div style={{display:'flex', marginRight:7}}>
                            <div style={{flex:'1 1 0%'}}>
                                <SelectField
                                    value={this.state.valuep1Key}
                                    style={styleList}
                                    floatingLabelText="Player 1"
                                    onChange={this.handleChangeP1Key}>
                                    {this.renderUsers()}
                                </SelectField>
                                <TextField
                                    hintText=""
                                    floatingLabelText="Team P1"
                                    style={styleList}
                                    onChange={(evt) => this.setState({ p1Team: evt.target.value })}
                                    value={this.state.p1Team}
                                />
                                <TextField
                                    hintText=""
                                    floatingLabelText="Score P1"
                                    style={styleList}
                                    onChange={(evt) => this.setState({ p1Score: evt.target.value })}
                                    value={this.state.p1Score}
                                />

                            </div>
                            <div style={{flex:'1 1 0%', paddingLeft:7}}>
                                <SelectField
                                    value={this.state.valuep2Key}
                                    style={styleList}
                                    floatingLabelText="Player 2"
                                    onChange={this.handleChangeP2Key}>
                                    {this.renderUsers()}
                                </SelectField>
                            <TextField
                                hintText=""
                                floatingLabelText="Team P2"
                                style={styleList}
                                onChange={(evt) => this.setState({ p2Team: evt.target.value })}
                                value={this.state.p2Team}
                            />
                            <TextField
                                hintText=""
                                floatingLabelText="Score P2"
                                style={styleList}
                                onChange={(evt) => this.setState({ p2Score: evt.target.value })}
                                value={this.state.p2Score}
                            />
                            </div>

                        </div>
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
