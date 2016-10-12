import React from 'react';
import Avatar from 'material-ui/Avatar';
import {grey900, grey600, grey500, cyan500} from 'material-ui/styles/colors';


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


export default class GameItem extends React.Component {


    renderNameP1() {

        const { game } = this.props;

       // const { p1Winner } = this.props;
       
        const nameStyleP1 = {
          display: 'block',
          color:  game.p1Winner ? cyan500 : grey900,
          fontWeight: '500',
          marginBottom:'2px',
          fontSize: '15px'
        };

        return (
           <span style={nameStyleP1}>{game.p1Name}</span>
        );
    }

    renderNameP2() {

        const { game } = this.props;

        //const { p2Winner } = this.props;
       
        const nameStyleP2 = {
          display: 'block',
          color:  game.p2Winner ? cyan500 : grey900,
          fontWeight: '500',
          marginBottom:'2px',
          fontSize: '15px'
        };

        return (
           <span style={nameStyleP2}>{game.p2Name}</span>
        );
    }

  render() {

      const { game } = this.props;

        return (
          <div style={myStyle}>

            <div style={{flex:'1'}}>
              <Avatar
                  src={game.p1Picture}
                  size={40}
                  style={{margin: '0px', float:'left'}}
                />
                <div style={{float: 'left', padding:'4px 0 0 10px'}}>
                  {this.renderNameP1()}
                  <span style={subNameStyle}>{game.p1Club}</span>
                </div>
            </div>

            <div style={{flex:'1', padding:'4px 0 0', textAlign:'center', maxWidth:'50px'}}>
              <span style={scoreStyle}>{game.p1Score}</span>
              <span style={scoreStyle}> - </span>
              <span style={scoreStyle}>{game.p2Score}</span>
              <span style={dateStyle}>{game.date}</span>
            </div>

            <div style={{flex:'1'}}>
              <Avatar
                  src={game.p2Picture}
                  size={40}
                  style={{margin: '0px', float:'right'}}
                />
                <div style={{float: 'right', padding:'4px 10px 0 0', textAlign:'right'}}>
                  {this.renderNameP2()}
                  <span style={subNameStyle}>{game.p2Club}</span>
                </div>
            </div>

          </div>
);
}
}