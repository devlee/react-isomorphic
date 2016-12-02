import React from 'react';

import { autobind } from 'core-decorators';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

const custom = { stiffness: 100, damping: 20 };

export default class DemoItem5 extends React.Component {
  state = {
    merge: 0,
    target: {
      x: 100
    }
  }

  @autobind
  handleClick() {
    const { merge } = this.state;

    if (merge === 0) {
      this.setState({
        merge: 1,
        target: {
          x: spring(0, custom)
        }
      });
    } else {
      this.setState({
        merge: 0,
        target: {
          x: spring(100, custom)
        }
      });
    }
  }

  render() {
    const { merge, target } = this.state;
    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <Motion
            defaultStyle={{ x: merge === 0 ? 100 : 0 }}
            style={target}
          >
            {
              ({ x }) => {
                const s = {};
                s.transform = `translateY(-${x / 5}px)`;
                s.borderBottomLeftRadius = `${x < 5 ? 0 : 2}px`;
                s.borderBottomRightRadius = `${x < 5 ? 0 : 2}px`;
                return (
                  <div
                    className={styles.item}
                    style={s}
                  ></div>
                );
              }
            }
          </Motion>
          <Motion
            defaultStyle={{ x: merge === 0 ? 100 : 0 }}
            style={target}
          >
            {
              ({ x }) => {
                const s = {};
                s.transform = `translateY(${x / 5}px)`;
                s.borderTopLeftRadius = `${x < 5 ? 0 : 2}px`;
                s.borderTopRightRadius = `${x < 5 ? 0 : 2}px`;
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
