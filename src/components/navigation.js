import React, { Component } from 'react';
import { IndexLink, Link  } from "react-router";
import {Tabs, Tab} from 'material-ui/Tabs';
import IconStar from 'material-ui/svg-icons/action/stars';
import IconList from 'material-ui/svg-icons/action/list';
import IconGroup from 'material-ui/svg-icons/action/group-work';


const gamesIcon = <IconList />;
const rankingIcon = <IconStar />;
const groupIcon = <IconGroup />;


class Navigation extends Component {

  render() {

       const { location } = this.props;

      let tabSelect;
      if (location.pathname === "/") {
          tabSelect = 0;
      } else if (location.pathname.match(/^\/ranking/)) {
          tabSelect = 1;
      } else if (location.pathname.match(/^\/group/)){
          tabSelect = 2;
      }

    return (
        <Tabs initialSelectedIndex={tabSelect}>
            <Tab
                icon={gamesIcon}
                label="GAMES"
                containerElement={<IndexLink to="/"/>}
            />
            <Tab
                icon={rankingIcon}
                label="RANKING"
                containerElement={<Link to="/ranking"/>}
            />
            <Tab
                icon={groupIcon}
                label="GROUP"
                containerElement={<Link to="/group"/>}
            />
        </Tabs>
    );
  }


}

export default Navigation;