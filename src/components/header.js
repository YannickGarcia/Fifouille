import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

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