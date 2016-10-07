import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './components/navigation';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div style={{position: 'absolute', bottom: '0'}}>
           <Navigation />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
