import React from 'react';

import { Link } from 'react-router';

export default class Demo extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    return (
      <div className="container demo-component">
        <h1>Demo Component</h1>
        <Link to="/demo/1">Demo1</Link>&nbsp;
        <Link to="/demo/2">Demo2</Link>
        {this.props.children}
      </div>
    );
  }
}
