import React, { Component } from 'react';
import { IndexLink, Link  } from "react-router";
import {Tabs, Tab} from 'material-ui/Tabs';


class Navigation extends Component {

  render() {

       const { location } = this.props;

      let tabSelect;
      if (location.pathname === "/") {
          tabSelect = 0;
      } else if (location.pathname.match(/^\/profile/)) {
          tabSelect = 1;
      } else if (location.pathname.match(/^\/group/)){
          tabSelect = 2;
      }

    return (
        <Tabs initialSelectedIndex={tabSelect}>
            <Tab
                label="Games"
                containerElement={<IndexLink to="/"/>}
            />
            <Tab
                label="Group"
                containerElement={<Link to="/group"/>}
            />
            <Tab
                label="Profile"
                containerElement={<Link to="/profile"/>}
            />
        </Tabs>
    );
  }


}

export default Navigation;