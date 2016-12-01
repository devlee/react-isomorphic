import React from 'react';

import { Link } from 'react-router';

import DemoItem1 from './item1';

import DemoItem2 from './item2';

import DemoItem3 from './item3';

const DemoItems = [DemoItem1, DemoItem2, DemoItem3];

export default class DemoItem extends React.PureComponent {
  static propTypes = {
    params: React.PropTypes.object
  };

  render() {
    const DemoItemComponent = DemoItems[this.props.params.demoId - 1];

    return (
      <div className="demo-item-wrapper-component">
        {
          DemoItemComponent ? <DemoItemComponent /> : (
            <div>
              No Demo Item: {this.props.params.demoId}
            </div>
          )
        }
        <Link to="/demo">Back</Link>
      </div>
    );
  }
}
