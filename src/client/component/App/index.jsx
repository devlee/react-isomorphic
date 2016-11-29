import React from 'react';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from '../Nav';

@connect()
@autobind
export default class App extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.object,
    location: React.PropTypes.object
  };

  render() {
    const context = {
      userAgent: navigator.userAgent || 'all'
    };

    const { location, children } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(context)}>
        <div className="root app-component">
          <Nav location={location} />
          { children }
        </div>
      </MuiThemeProvider>
    );
  }
}
