import React from 'react';

import { Link } from 'react-router';

import styles from './index.pcss';

export default class Demo extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    const arr = Array.from(new Array(9), (_, i) => i);

    return (
      <div className="container demo-component">
        <h1>Demo Component</h1>
        {
          arr.map((item, i) => {
            return (
              <Link className={styles.link} key={i} to={`/demo/${item + 1}`}>Demo{item + 1}</Link>
            );
          })
        }
        {this.props.children}
      </div>
    );
  }
}
