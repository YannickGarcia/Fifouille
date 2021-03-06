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
            p1TeamVisible: false,
            p1Score:'',
            p1Winner:'popo',
            p1Draw:'',
            p1Loser:'',
            p1NewPoints: '',
            p2Key:'',
            valuep2Key:'',
            p2Team:'',
            p2TeamVisible: false,
            p2Score:'',
            p2Winner:'',
            p2Draw:'',
            p2Loser:'',
            users: [],
            p1Points:'',
            p1PointsNew:'',
            p2Points:'',
            p2PointsNew:'',
            p2NewPoints: '',
            scoreP1Viz:false,
            scoreP2Viz: false,
            errorMsg:''

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

    renderP1Team(){
        if(this.state.p1TeamVisible){
            return(
                <TextField
                    hintText="P1 Team"
                    style={styleList}
                    onChange={(evt) => this.setState({ p1Team: evt.target.value })}
                    value={this.state.p1Team}
                    tabIndex="3"
                />
            );
        }
    }

    renderP2Team(){
        if(this.state.p2TeamVisible){
            return(
                <TextField
                    hintText="P2 Team"
                    style={styleList}
                    onChange={(evt) => this.setState({ p2Team: evt.target.value })}
                    value={this.state.p2Team}
                    tabIndex="4"
                />
            );
        }
    }

    renderP1Score(){
        if(this.state.scoreP1Viz && this.state.scoreP2Viz){
            return(
                <TextField
                    hintText="Score Player 1"
                    type="tel"
                    floatingLabelText="Score Player 1"
                    maxLength="2"
                    style={styleList}
                    onChange={(evt) => this.setState({ p1Score: evt.target.value })}
                    value={this.state.p1Score}
                    tabIndex="5"
                />
            );
        }
    }

    renderP2Score(){
        if(this.state.scoreP1Viz && this.state.scoreP2Viz){
            return(
                <TextField
                    hintText="Score Player 2"
                    type="tel"
                    floatingLabelText="Score Player 2"
                    maxLength="2"
                    style={styleList}
                    onChange={(evt) => this.setState({ p2Score: evt.target.value })}
                    value={this.state.p2Score}
                    tabIndex="6"
                />
            );
        }
    }


    handleChangeP1Key = (event, index, valuep1Key, evt) => {this.setState({valuep1Key, p1Key: valuep1Key}, function(){
        rootRef.child('users/' + this.state.p1Key).once('value', snap => {
            this.setState({p1Team: snap.val().favTeam, p1TeamVisible:true, scoreP1Viz:true}, function(){

            });

        });
    })};

    handleChangeP2Key = (event, index, valuep2Key, evt) => {this.setState({valuep2Key, p2Key: valuep2Key}, function(){
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            this.setState({p2Team: snap.val().favTeam, p2TeamVisible:true, scoreP2Viz:true }, function(){

            });

        });
    })};

    //handleChangeP2Key = (event, index, valuep2Key, evt) => this.setState({valuep2Key, p2Key: valuep2Key});


    handleSubmit(event) {
        event.preventDefault();
        const regexp = /^\d+$/;
        if (regexp.test(this.state.p1Score) && regexp.test(this.state.p2Score)) {


            if (this.state.p1Key.length && this.state.p2Key.length && this.state.p1Team.length && this.state.p2Team.length) {

                const p1Score = this.state.p1Score.trim();
                const p2Score = this.state.p2Score.trim();

                //console.log(p1Score);
                if (p1Score > p2Score) {
                    this.setState({
                        p1Winner: true,
                        p1Draw: false,
                        p1Loser: false,
                        p2Winner: false,
                        p2Draw: false,
                        p2Loser: true
                    }, function () {
                        this.p1Wins();
                        this.p1WinsRenderELO();
                    });

                } else if (p1Score === p2Score) {
                    this.setState({
                        p1Winner: false,
                        p1Draw: true,
                        p1Loser: false,
                        p2Winner: false,
                        p2Draw: true,
                        p2Loser: false
                    }, function () {
                        //this.pushTheGame();
                        this.isDraw();
                        this.isDrawRenderELO();
                    });
                } else if (p1Score < p2Score) {
                    this.setState({
                        p1Winner: false,
                        p1Draw: false,
                        p1Loser: true,
                        p2Winner: true,
                        p2Draw: false,
                        p2Loser: false
                    }, function () {
                        //this.pushTheGame();
                        this.p2Wins();
                        this.p2WinsRenderELO();
                    });
                }
            } else {
                this.setState({errorMsg: 'Form uncompleted'})
            }
        } else {
            this.setState({errorMsg: 'Scores are not integer numbers'})
        }
    }

    p1WinsRenderELO(){

        //récup des points de P1
        rootRef.child('users/' + this.state.p1Key).once('value', snap => {
            this.setState({p1Points:snap.val().points}, function () {
                //récup des points de P2
                rootRef.child('users/' + this.state.p2Key).once('value', snap => {
                    this.setState({p2Points:snap.val().points}, function () {

                        const diffScore = Number(this.state.p1Score) - Number(this.state.p2Score);
                        const kBasis = 40;

                        const kFactor = (diffScore === 2) ? (kBasis * 1.5)
                                            : (diffScore === 3) ? (kBasis * 1.75)
                                                : (diffScore >= 4) ? ((kBasis * 1.75) + (diffScore-3)/8)
                                                    : kBasis;

                        console.log('Goal Diff = ' + diffScore + '=> kFactor = ' + kFactor);

                        const diffRating =  Number(this.state.p2Points) - Number(this.state.p1Points);
                        const myChanceToWin = 1 / (Math.pow(10, diffRating / 400) + 1);
                        const getRatingDelta =  Math.round(kFactor * (1 - myChanceToWin)); // 1 because win
                        const getNewRatingP1 = Number(this.state.p1Points) + getRatingDelta;


                        const diffRatingP2 =  Number(this.state.p1Points) - Number(this.state.p2Points);
                        const myChanceToWinP2 = 1 / (Math.pow(10, diffRatingP2 / 400) + 1);
                        const getRatingDeltaP2 =  Math.round(kFactor * (0 - myChanceToWinP2)); // 0 because lost
                        const getNewRatingP2 = Number(this.state.p2Points) + getRatingDeltaP2;

                        // push scores in DB
                        rootRef.child('users/' + this.state.p1Key).update({points: getNewRatingP1 < 0 ? 0 : getNewRatingP1});
                        rootRef.child('users/' + this.state.p2Key).update({points: getNewRatingP2 < 0 ? 0 : getNewRatingP2});

                        console.log('P1 Points Before: '+this.state.p1Points + ', P1 Points After: '+getNewRatingP1);
                        console.log('P2 Points Before: '+this.state.p2Points + ', P2 Points After: '+getNewRatingP2);

                        this.pushTheGame(getRatingDelta,getRatingDeltaP2);



                    });
                });

            });
        });

    }

    p2WinsRenderELO(){

        //récup des points de P2
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            this.setState({p2Points:snap.val().points}, function () {
                //récup des points de P2
                rootRef.child('users/' + this.state.p1Key).once('value', snap => {
                    this.setState({p1Points:snap.val().points}, function () {

                        const diffScore = Number(this.state.p2Score) - Number(this.state.p1Score);
                        const kBasis = 40;

                        const kFactor = (diffScore === 2) ? (kBasis * 1.5)
                            : (diffScore === 3) ? (kBasis * 1.75)
                            : (diffScore >= 4) ? ((kBasis * 1.75) + (diffScore-3)/8)
                            : kBasis;

                        console.log('Goal Diff = ' + diffScore + '=> kFactor = ' + kFactor);

                        const diffRating =  Number(this.state.p1Points) - Number(this.state.p2Points);
                        const myChanceToWin = 1 / (Math.pow(10, diffRating / 400) + 1);
                        const getRatingDelta =  Math.round(kFactor * (1 - myChanceToWin)); // 1 because win
                        const getNewRatingP2 = Number(this.state.p2Points) + getRatingDelta;
                        //console.log(getNewRating);

                        const diffRatingP1 =  Number(this.state.p2Points) - Number(this.state.p1Points);
                        const myChanceToWinP1 = 1 / (Math.pow(10, diffRatingP1 / 400) + 1);
                        const getRatingDeltaP1 =  Math.round(kFactor * (0 - myChanceToWinP1)); // 0 because lost
                        const getNewRatingP1 = Number(this.state.p1Points) + getRatingDeltaP1;

                        // push scores in DB
                        rootRef.child('users/' + this.state.p1Key).update({points: getNewRatingP1 < 0 ? 0 : getNewRatingP1});
                        rootRef.child('users/' + this.state.p2Key).update({points: getNewRatingP2 < 0 ? 0 : getNewRatingP2});

                        console.log('P1 Points Before: '+this.state.p1Points + ', P1 Points After: '+getNewRatingP1);
                        console.log('P2 Points Before: '+this.state.p1Points + ', P2 Points After: '+getNewRatingP2);

                        this.pushTheGame(getRatingDeltaP1, getRatingDelta);


                        // push in DB
                        rootRef.child('users/' + this.state.p2Key).update({points: getNewRatingP2});
                    });
                });

            });
        });
    }

    isDrawRenderELO(){

        //récup des points de P2
        rootRef.child('users/' + this.state.p2Key).once('value', snap => {
            this.setState({p2Points:snap.val().points}, function () {
                //récup des points de P1
                rootRef.child('users/' + this.state.p1Key).once('value', snap => {
                    this.setState({p1Points:snap.val().points}, function () {
                        const diffRatingP1 =  Number(this.state.p2Points) - Number(this.state.p1Points);
                        const myChanceToWinP1 = 1 / (Math.pow(10, diffRatingP1 / 400) + 1);
                        const getRatingDeltaP1 =  Math.round(40 * (0.5 - myChanceToWinP1)); // 0.5 because draw
                        const getNewRatingP1 = Number(this.state.p1Points) + getRatingDeltaP1;


                        const diffRatingP2 =  Number(this.state.p1Points) - Number(this.state.p2Points);
                        const myChanceToWinP2 = 1 / (Math.pow(10, diffRatingP2 / 400) + 1);
                        const getRatingDeltaP2 =  Math.round(40 * (0.5 - myChanceToWinP2)); // 0.5 because draw
                        const getNewRatingP2 = Number(this.state.p2Points) + getRatingDeltaP2;

                        // push in DB
                        rootRef.child('users/' + this.state.p1Key).update({points: getNewRatingP1 < 0 ? 0 : getNewRatingP1});
                        rootRef.child('users/' + this.state.p2Key).update({points: getNewRatingP2 < 0 ? 0 : getNewRatingP2});

                        console.log('P1 Points Before: '+this.state.p1Points + ', P1 Points After: '+getNewRatingP1);
                        console.log('P2 Points Before: '+this.state.p1Points + ', P2 Points After: '+getNewRatingP2);

                        this.pushTheGame(getRatingDeltaP1, getRatingDeltaP2);
                    });
                });

            });
        });
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

    pushTheGame(p1NewPoints,p2NewPoints){
        console.log('P1 pts: '+p1NewPoints + ', P2 pts: ' + p2NewPoints);
        const newGame = {
            p1Key:this.state.valuep1Key,
            p1Team:this.state.p1Team,
            p1Score:this.state.p1Score,
            p1Winner:this.state.p1Winner,
            p1Draw:this.state.p1Draw,
            p1Loser:this.state.p1Loser,
            p1GamePts:p1NewPoints,
            p2Key:this.state.valuep2Key,
            p2Team:this.state.p2Team,
            p2Score:this.state.p2Score,
            p2Winner:this.state.p2Winner,
            p2Draw:this.state.p2Draw,
            p2Loser:this.state.p2Loser,
            p2GamePts:p2NewPoints,
            timeStamp:timeRef,
            groupKey: '-KUh54HpGOGP850b2Tpu'
        };
        gamesRef.push(newGame);
            console.log('new game pushed');
            this.setState({
                submitDisabled: false,
                p1Key:'',
                valuep1Key:'',
                p1Team:'',
                p1TeamVisible: false,
                p1Score:'',
                p1Winner:'',
                p1Draw:'',
                p1Loser:'',
                p1NewPoints: '',
                p2Key:'',
                valuep2Key:'',
                p2Team:'',
                p2TeamVisible: false,
                p2Score:'',
                p2Winner:'',
                p2Draw:'',
                p2Loser:'',
                users: [],
                p1Points:'',
                p1PointsNew:'',
                p2Points:'',
                p2PointsNew:'',
                p2NewPoints: '',
                scoreP1Viz:false,
                scoreP2Viz: false,
                errorMsg:''
            }, function () {
                this.handleRequestClose();
                this.componentDidMount();
            });

            //setTimeout(function(){ location.reload(); }, 500);


    }

    render(){
        const style = {
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: '100'
        };
        const styleDialog = {
            top: '-130px'
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
                //disabled={this.handleDisabled}
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
                    style={styleDialog}
                >

                    <form onSubmit={this.handleSubmit.bind(this)} className="TaskInput-form">
                        <h4>Don't add fake games</h4>
                        <div style={{display:'flex', marginRight:7}}>
                            <div style={{flex:'1 1 0%'}}>
                                <SelectField
                                    value={this.state.valuep1Key}
                                    style={styleList}
                                    floatingLabelText="Player 1"
                                    onChange={this.handleChangeP1Key}>
                                    {this.renderUsers()}
                                </SelectField>
                                {this.renderP1Team()}
                                {this.renderP1Score()}

                            </div>
                            <div style={{flex:'1 1 0%', paddingLeft:7}}>
                                <SelectField
                                    value={this.state.valuep2Key}
                                    style={styleList}
                                    floatingLabelText="Player 2"
                                    onChange={this.handleChangeP2Key}>
                                    {this.renderUsers()}
                                </SelectField>
                                {this.renderP2Team()}
                                {this.renderP2Score()}
                            </div>
                        </div>

                        <p style={{color:'red'}}>{this.state.errorMsg}</p>
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