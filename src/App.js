import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './components/navigation';
import HeaderApp from './components/header';
import {grey100} from 'material-ui/styles/colors';
import './App.css';
import 'react-select/dist/react-select.css';

class App extends Component {

render() {
   const { location } = this.props;

    return (
      <div className="App" style={{backgroundColor: grey100, height: '100%'}}>
        <MuiThemeProvider>
          <div>
            <div style={{position: 'fixed', top: '0', width: '100%'}}>
            <HeaderApp />
            <Navigation location={location}/>
            </div>
              <div style={{padding: '150px 10px 10px'}}>
              {this.props.children}
              </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
