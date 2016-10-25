import React from 'react';
import AppBar from 'material-ui/AppBar';
import {grey800} from 'material-ui/styles/colors';



const styles = {
  title: {
    //cursor: 'pointer',
    color: grey800,
    display:'block',
    textAlign: 'center'
  },
  appbar:{
    backgroundColor: '#FFF',
    boxShadow: '0,0,0'
  }
};

const HeaderApp = () => (
  <AppBar
    title={<span style={styles.title}>Offifa</span>}
    showMenuIconButton={false}
    style={styles.appbar}
  />
);

export default HeaderApp;