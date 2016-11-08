import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Navigation from './components/navigation';
import HeaderApp from './components/header';
import './App.css';
import 'react-select/dist/react-select.css';


import { amber500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: amber500,
    }
});

class App extends Component {

render() {
   const { location } = this.props;

    return (
      <div className="App" style={{height: '100%'}}>
        <MuiThemeProvider  muiTheme={muiTheme}>
          <div>
            <div style={{position: 'fixed', top: '0', width: '100%', zIndex:'100'}}>
            <HeaderApp />
            <Navigation location={location}/>
            </div>
              <div style={{padding: '130px 10px 10px'}}>
              {this.props.children}
              </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
