import React from 'react';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import demoItem9Selector from '../../../selector/demoItem9';

class DemoItem9 extends React.PureComponent {
  static propTypes = {
    dispatch: React.PropTypes.func,
    testCount: React.PropTypes.number,
    testFetching: React.PropTypes.bool,
    testRequest: React.PropTypes.func,
    testCancel: React.PropTypes.func
  };

  @autobind
  handleClick() {
    const { dispatch, testRequest, testCancel, testFetching } = this.props;

    if (!testFetching) {
      dispatch(testRequest());
    } else {
      dispatch(testCancel());
    }
  }

  render() {
    const { testCount, testFetching } = this.props;
    return (
      <div className="demo-item-content-component">
        <h2>redux + rxjs + socket.io</h2>
        <div>
          {
            testFetching ? <span>fetching</span> : <span>done</span>
          }
        </div>
        <div>value:{testCount}</div>
        <button onClick={this.handleClick}>
          {
            !testFetching ? <span>Request</span> : <span>Cancel</span>
          }
        </button>
      </div>
    );
  }
}

export default connect(demoItem9Selector)(DemoItem9);
