import React from 'react';

import { autobind } from 'core-decorators';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

export default class DemoItem2 extends React.Component {
  state = {
    origin: Array.from(new Array(7), (_, i) => i),
    queue: Array.from(new Array(7), (_, i) => i),
    currentKey: 0,
    inited: false
  };

  @autobind
  handleClick(e) {
    e.preventDefault();

    const target = e.target;

    const key = target.dataset.key;

    const newQueue = Object.assign([], this.state.queue);

    const nextKey = key - 1 >= 0 ? key - 1 : null;

    if (nextKey !== null) {
      newQueue.splice(nextKey, 1);
      newQueue.push(this.state.origin[nextKey]);
      this.setState({
        queue: newQueue,
        currentKey: key,
        inited: true
      });
    } else {
      newQueue.splice(0, 1);
      newQueue.push(this.state.origin[6]);
      this.setState({
        queue: newQueue,
        currentKey: key,
        inited: true
      });
    }
  }

  render() {
    return (
      <div className="demo-item-content-component">
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            {
              this.state.queue.map((_, i) => {
                /* eslint-disable no-bitwise */
                const k = `k${_ + 1}`;
                return (
                  <Motion
                    key={i + this.state.currentKey}
                    defaultStyle={{
                      x: (i === (this.state.queue.length - 1)) && this.state.inited ? 1 : 100
                    }}
                    style={{
                      x: spring(100, { stiffness: 100, damping: 20 })
                    }}
                  >
                    {
                      ({ x }) => (
                        <div
                          className={`${styles.itemWrapper} ${styles[k]}`}
                          style={{
                            transform: `scale(${x / 100})`,
                            borderRadius: x > 90 ? `${((1 - ((x - 90) / 10)) * 100)}%` : '100%'
                          }}
                        >
                          <a
                            href=""
                            data-key={_}
                            className={styles.item}
                            onClick={this.handleClick}
                            style={{
                              transform: `scale(${100 / x})`
                            }}
                          >
                            {_ + 1}
                          </a>
                        </div>
                      )
                    }
                  </Motion>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
