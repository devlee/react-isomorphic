import React from 'react';

import { Link } from 'react-router';

import DemoItem1 from './item1';

import DemoItem2 from './item2';

import DemoItem3 from './item3';

import DemoItem4 from './item4';

import DemoItem5 from './item5';

import DemoItem6 from './item6';

import DemoItem7 from './item7';

import DemoItem8 from './item8';

const DemoItems = [
  DemoItem1,
  DemoItem2,
  DemoItem3,
  DemoItem4,
  DemoItem5,
  DemoItem6,
  DemoItem7,
  DemoItem8
];

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
