import React, { Component } from 'react';
// import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './components/navigation';
import HeaderApp from './components/header';
import GameList from './components/game-list-component';
import AddGame from './components/add-game-component';
import {grey100} from 'material-ui/styles/colors';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App" style={{backgroundColor: grey100, height: '100%'}}>
        <MuiThemeProvider>
          <div>
            <div style={{position: 'fixed', top: '0', width: '100%'}}>
             <HeaderApp /><Navigation />
            </div>
            <div style={{padding: '150px 10px 10px'}}>

                 <GameList />
            </div>
            <div>
                <AddGame />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
