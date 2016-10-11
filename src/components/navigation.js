import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconStar from 'material-ui/svg-icons/action/stars';
import IconList from 'material-ui/svg-icons/action/list';
import IconGroup from 'material-ui/svg-icons/action/group-work';

const gamesIcon = <IconList />;
const rankingIcon = <IconStar />;
const groupIcon = <IconGroup />;

class Navigation extends Component {

  render() {
    return (
        <Tabs>
          <Tab
              icon={gamesIcon}
              label="GAMES"
          />
          <Tab
              icon={rankingIcon}
              label="RANKING"
          />
          <Tab
              icon={groupIcon}
              label="GROUP"
          />
        </Tabs>
    );
  }
}

export default Navigation;