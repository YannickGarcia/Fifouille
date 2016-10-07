import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

const HeaderApp = () => (
  <AppBar
    title={<span style={styles.title}>Fifa at Work</span>}
    iconElementRight={<FlatButton label="Add Game" />}
    showMenuIconButton={false}
  />
);

export default HeaderApp;