import React from 'react';

import { Link } from 'react-router';

import DemoItem1 from './item1';

const DemoItems = [DemoItem1];

export default class DemoItem extends React.PureComponent {
  static propTypes = {
    params: React.PropTypes.object
  };

  render() {
    const DemoItemComponent = DemoItems[this.props.params.demoId - 1];

    return (
      <div className="demo-item-wrapper-component">
        {
          DemoItemComponent ? <DemoItemComponent /> : null
        }
        <Link to="/demo">Back</Link>
      </div>
    );
  }
}
