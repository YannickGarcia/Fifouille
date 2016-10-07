import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './components/navigation';
import HeaderApp from './components/header';
import GameList from './components/game-list-component';
import {grey100} from 'material-ui/styles/colors';
import './App.css';

const games = [
{
    p1Name: 'Claudy',
    p1Picture: 'https://pbs.twimg.com/profile_images/712410280655851520/4uycTfbn.jpg',
    p1Club: 'FC Sevilla',
    p1Score: '3',
    p1Winner: false,
    date: 'Oct. 12',
    p2Name: 'Michel',
    p2Picture: 'http://machohairstyles.com/wp-content/uploads/2016/01/Pat-Sharp%E2%80%99s-Mullet.jpg',
    p2Club: 'RSC Anderlecht',
    p2Score: '3',
    p2Winner: false
},
{
    p1Name: 'Jacky',
    p1Picture: 'https://s-media-cache-ak0.pinimg.com/236x/2c/a3/21/2ca3212f8942a564313b1e4914af8d38.jpg',
    p1Club: 'Standard Liège',
    p1Score: '1',
    p1Winner: true,
    date: 'Oct. 11',
    p2Name: 'René',
    p2Picture: 'https://66.media.tumblr.com/avatar_314e33e1b13b_128.png',
    p2Club: 'Paris St Germain',
    p2Score: '0',
    p2Winner: false
},
{
    p1Name: 'Gilbert',
    p1Picture: 'http://67.media.tumblr.com/avatar_f967b2cd6158_64.png',
    p1Club: 'Valencia',
    p1Score: '1',
    p1Winner: false,
    date: 'Oct. 11',
    p2Name: 'Raoul',
    p2Picture: 'https://pbs.twimg.com/profile_images/378800000111068754/8dd630d055f67f3c1e4653cb4eb846e9_normal.jpeg',
    p2Club: 'Juventus',
    p2Score: '4',
    p2Winner: true
}
];


class App extends Component {

   constructor(props) {
    
    super(props);

    this.state = {
        games
      };
    }

  render() {
    return (
      <div className="App" style={{backgroundColor: grey100, height: '100%'}}>
        <MuiThemeProvider>
          <div>
            <div style={{position: 'fixed', top: '0', width: '100%'}}>
             <HeaderApp />
            </div>
            <div style={{padding: '80px 10px 10px'}}>
              <GameList games={this.state.games} />
                    
            </div>
            <div style={{position: 'fixed', bottom: '0'}}>
             <Navigation />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
