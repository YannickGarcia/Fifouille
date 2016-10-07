import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './components/navigation';
import HeaderApp from './components/header';
import {grey100} from 'material-ui/styles/colors';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundColor: grey100, height: '100%'}}>
        <MuiThemeProvider>
          <div>
            <div style={{position: 'fixed', top: '0', width: '100%'}}>
             <HeaderApp />
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
