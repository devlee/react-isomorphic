import React from 'react';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import demoItem9Selector from '../../../selector/demoItem9';

import { testRequest } from '../../../action';

class DemoItem9 extends React.PureComponent {
  static propTypes = {
    dispatch: React.PropTypes.func,
    testCount: React.PropTypes.number
  };

  @autobind
  handleClick() {
    const { dispatch } = this.props;
    dispatch(testRequest());
  }

  render() {
    const { testCount } = this.props;
    return (
      <div className="demo-item-content-component">
        <h2>redux + rxjs</h2>
        <div>value:{testCount}</div>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
}

export default connect(demoItem9Selector)(DemoItem9);
