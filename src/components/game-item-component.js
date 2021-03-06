import React from 'react';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import {grey900, grey600, grey500, grey200, amber500} from 'material-ui/styles/colors';
import { rootRef } from '../firebase-ref';


const myStyle = {
  marginBottom: 0,
  backgroundColor: 'white',
    borderBottom: '1px solid' + grey200,
  display: 'flex',
  padding: '16px 0'
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


export default class GameItem extends React.Component {

    constructor() {
        super();

        this.state = {
            player1Name:'',
            player1Mulet:'',
            player2Name:'',
            player2Mulet:''
        };
    }

    componentDidMount(){
        const { game } = this.props;

        // Grab name of P1 and then the mulet URL
        const name1Key = game.p1Key;
        rootRef.child('users/' + name1Key).once('value', snap => {
            this.setState({player1Name:snap.val().username});
            // Grab mulet :D
            rootRef.child('muletvatars/' + snap.val().muletKey).once('value', snap => {
                this.setState({player1Mulet:'./muletvatars/' + snap.val().urlLocal});
            });
        });

        // Grab name of P2 and then the Mulet URL
        const name2Key = game.p2Key;
        rootRef.child('users/' + name2Key).once('value', snap => {
            this.setState({player2Name:snap.val().username});
            // Grab mulet :D
            rootRef.child('muletvatars/' + snap.val().muletKey).once('value', snap => {
                this.setState({player2Mulet:'./muletvatars/' + snap.val().urlLocal});
            });
        });


    }

    renderNameP1() {

        const { game } = this.props;

       // const { p1Winner } = this.props;
       
        const nameStyleP1 = {
          display: 'block',
          color:  game.p1Winner ? amber500 : grey900,
          fontWeight: '500',
          marginBottom:'2px',
          fontSize: '15px'
        };

        return (
           <span style={nameStyleP1}>{this.state.player1Name}</span>
        );
    }

    renderNameP2() {
        const { game } = this.props;
       
        const nameStyleP2 = {
          display: 'block',
          color:  game.p2Winner ? amber500 : grey900,
          fontWeight: '500',
          marginBottom:'2px',
          fontSize: '15px'
        };

        return (
           <span style={nameStyleP2}>{this.state.player2Name}</span>
        );
    }

    renderPointsP1(){
        const { game } = this.props;
        if(game.p1GamePts > 0){
            return(<span>+{game.p1GamePts} pts</span>);
        }else if(game.p1GamePts < 0){
            return(<span>{game.p1GamePts} pts</span>);
        }else if(game.p1GamePts === 0){
            return(<span>0 pts</span>);
        }else{
            return("");
        }
    }

    renderPointsP2(){
        const { game } = this.props;
        if(game.p2GamePts > 0){
            return(<span>+{game.p2GamePts} pts</span>);
        }else if(game.p2GamePts < 0){
            return(<span>{game.p2GamePts} pts</span>);
        }else if(game.p2GamePts === 0){
            return(<span>0 pts</span>);
        }else{
            return("");
        }
    }

  render() {

      const { game } = this.props;

        return (
          <div style={myStyle}>

            <div style={{flex:'1'}}>
              <Avatar
                  //src={this.state.player1Mulet}
                  src={this.state.player1Mulet}
                  size={40}
                  style={{margin: '0px', float:'left'}}
                />
                <div style={{float: 'left', padding:'0 0 0 10px'}}>
                  {this.renderNameP1()}
                    <span style={subNameStyle}>{game.p1Team}</span>
                    <span style={subNameStyle}>{this.renderPointsP1()}</span>
                </div>
            </div>

            <div style={{flex:'1', padding:'4px 0 0', textAlign:'center', maxWidth:'50px'}}>
              <span style={scoreStyle}>{game.p1Score}</span>
              <span style={scoreStyle}> - </span>
              <span style={scoreStyle}>{game.p2Score}</span>
              <span style={dateStyle}>{moment(game.timeStamp).format("DD MMM")}</span>
            </div>

            <div style={{flex:'1'}}>
              <Avatar
                  src={this.state.player2Mulet}
                  size={40}
                  style={{margin: '0px', float:'right'}}
                />
                <div style={{float: 'right', padding:'0 10px 0 0', textAlign:'right'}}>
                  {this.renderNameP2()}
                  <span style={subNameStyle}>{game.p2Team}</span>
                    <span style={subNameStyle}>{this.renderPointsP2()}</span>
                </div>
            </div>

          </div>
);
}
}