import React from 'react';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import selector from '../../selector/app';

import Nav from '../Nav';

@connect(selector)
@autobind
class App extends React.PureComponent {
  render() {
    const context = {
      userAgent: this.props.muiUserAgent || 'all'
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(context)}>
        <div className="root app-component">
          <Nav />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  muiUserAgent: React.PropTypes.string
};

export default App;
