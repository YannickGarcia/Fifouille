import React from 'react';
import Avatar from 'material-ui/Avatar';
import {grey900, grey600, grey500} from 'material-ui/styles/colors';

const myStyle = {
  marginBottom: 10,
  backgroundColor: 'white',
  boxShadow: '0 0 6px rgba(0,0,0,.1)',
  display: 'flex',
  padding: '12px'
};
const nameStyle = {
  display: 'block',
  color: grey900,
  fontWeight: '500',
  marginBottom:'2px',
  fontSize: '15px'
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

const GameItem = () => (
  <div style={myStyle}>

    <div style={{flex:'1'}}>
      <Avatar
          src={'https://pbs.twimg.com/profile_images/712410280655851520/4uycTfbn.jpg'}
          size={40}
          style={{margin: '0px', float:'left'}}
        />
        <div style={{float: 'left', padding:'4px 0 0 10px'}}>
          <span style={nameStyle}>Claudy</span>
          <span style={subNameStyle}>FC Sevilla</span>
        </div>
    </div>

    <div style={{flex:'1', padding:'3px 0 0', textAlign:'center', maxWidth:'50px'}}>
      <span style={scoreStyle}>3</span>
      <span style={scoreStyle}> - </span>
      <span style={scoreStyle}>1</span>
      <span style={dateStyle}>Oct. 12</span>
    </div>

    <div style={{flex:'1'}}>
      <Avatar
          src={'http://machohairstyles.com/wp-content/uploads/2016/01/Pat-Sharp%E2%80%99s-Mullet.jpg'}
          size={40}
          style={{margin: '0px', float:'right'}}
        />
        <div style={{float: 'right', padding:'4px 10px 0 0', textAlign:'right'}}>
          <span style={nameStyle}>Claudy</span>
          <span style={subNameStyle}>FC Sevilla</span>
        </div>
    </div>

  </div>
);

export default GameItem;