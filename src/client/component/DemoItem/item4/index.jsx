import React from 'react';

import { autobind } from 'core-decorators';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

const custom = { stiffness: 100, damping: 20 };

export default class DemoItem4 extends React.Component {
  state = {
    count: 0,
    target: {
      x: 20
    }
  }

  @autobind
  handleClick() {
    const { count } = this.state;
    if (count === 0) {
      this.setState({
        count: 1,
        target: {
          x: spring(100, custom)
        }
      });
    } else {
      this.setState({
        count: 0,
        target: {
          x: spring(20, custom)
        }
      });
    }
  }

  render() {
    const { count, target } = this.state;

    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <Motion
            defaultStyle={{ x: count === 0 ? 20 : 100 }}
            style={target}
          >
            {
              ({ x }) => {
                const s = {};

                s.transform = `scale(${x / 20})`;
                s.borderRadius = `${100 - x}%`;

                return (
                  <div
                    className={styles.item}
                    style={s}
                  ></div>
                );
              }
            }
          </Motion>
        </div>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
}
