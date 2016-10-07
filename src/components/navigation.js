import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconStar from 'material-ui/svg-icons/action/stars';
import IconList from 'material-ui/svg-icons/action/list';
import IconGroup from 'material-ui/svg-icons/action/group-work';
import IconAccount from 'material-ui/svg-icons/action/account-circle';

const gamesIcon = <IconList />;
const rankingIcon = <IconStar />;
const groupIcon = <IconGroup />;
const profileIcon = <IconAccount />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class Navigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Games"
            icon={gamesIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Ranking"
            icon={rankingIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Group"
            icon={groupIcon}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Profile"
            icon={profileIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Navigation;