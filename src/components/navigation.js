import React, { Component } from 'react';
import { IndexLink, Link  } from "react-router";
import {Tabs, Tab} from 'material-ui/Tabs';
import {grey800} from 'material-ui/styles/colors';


const styles = {
    title: {
        //cursor: 'pointer',
        color: grey800
    },
    tab:{
        backgroundColor: '#FFF',
        color: grey800,
        textTransform: 'capitalize',
        fontSize: '16px',
    },
    tabs:{
      borderBottom: '1px solid' + grey800
    },
    ink:{
        backgroundColor: grey800
    }
};

class Navigation extends Component {

  render() {

       const { location } = this.props;

      let tabSelect;
      if (location.pathname === "/") {
          tabSelect = 0;
      } else if (location.pathname.match(/^\/group/)){
          tabSelect = 1;
      }

    return (
        <Tabs initialSelectedIndex={tabSelect} style={styles.tabs} inkBarStyle={styles.ink}>
            <Tab
                label="Games"
                containerElement={<IndexLink to="/"/>}
                style={styles.tab}
            />
            <Tab
                label="Group"
                containerElement={<Link to="/group"/>}
                style={styles.tab}
            />
        </Tabs>
    );
  }


}

/*
 <Tab
 label="Profile"
 containerElement={<Link to="/profile"/>}
 style={styles.tab}
 />
 */

export default Navigation;