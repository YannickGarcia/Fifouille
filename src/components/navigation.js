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

      //const { history } = this.props;
      //console.log(history.isActive("group"));

      const { location } = this.props;
      const { collapsed } = this.state;
      // const featuredClass = location.pathname === "/" ? "active" : "";
      // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
      // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";

    return (
        <Tabs initialSelectedIndex="1">
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