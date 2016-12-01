import React from 'react';

import { autobind } from 'core-decorators';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

import img from './React.js_logo.svg.png';

const custom = { stiffness: 40, damping: 10 };

const defaultState = {
  wrapperCurrent: {
    x: 10,
    y: 120
  },
  wrapperTarget: {
    x: 10,
    y: 120
  },
  itemCurrent: {
    x2: 10,
    y2: 0
  },
  itemTarget: {
    x2: 10,
    y2: 0
  }
};

let idx = 0;

export default class DemoItem3 extends React.Component {
  state = {};

  componentWillMount() {
    this.setState(Object.assign(this.state, defaultState));
    idx = 0;
  }

  @autobind
  click1() {
    this.setState({
      wrapperTarget: {
        x: spring(30, custom),
        y: 120
      }
    });
  }

  @autobind
  click2() {
    this.setState({
      itemTarget: {
        x2: 10,
        y2: spring(-40, custom)
      }
    });
  }

  @autobind
  click3() {
    this.setState({
      itemCurrent: {
        x2: 10,
        y2: -40
      },
      itemTarget: {
        x2: spring(30, custom),
        y2: spring(0, custom)
      }
    });
  }

  @autobind
  click4() {
    this.setState({
      wrapperCurrent: {
        x: 30,
        y: 120
      },
      wrapperTarget: {
        x: spring(10, custom),
        y: 120
      }
    });
  }

  @autobind
  click5() {
    this.setState({
      itemCurrent: {
        x2: 30,
        y2: 0
      },
      itemTarget: {
        x2: 30,
        y2: spring(120, custom)
      }
    });
  }

  @autobind
  click6() {
    this.setState({
      itemCurrent: {
        x2: 30,
        y2: 120
      },
      itemTarget: {
        x2: spring(10, custom),
        y2: spring(0, custom)
      }
    });
  }

  @autobind
  handleClick() {
    if (idx >= 6) {
      idx = 0;
    }

    idx += 1;

    this[`click${idx}`]();
  }

  render() {
    const {
      wrapperCurrent,
      wrapperTarget,
      itemCurrent,
      itemTarget
    } = this.state;

    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <Motion
            defaultStyle={wrapperCurrent}
            style={wrapperTarget}
          >
            {
              ({ x, y }) => {
                const s = {
                  transform: `translate(${y}px, ${y}px) scale(${x / 10})`
                };

                return (
                  <div
                    className={styles.wrapper}
                    style={s}
                  >
                    <Motion
                      defaultStyle={itemCurrent}
                      style={itemTarget}
                    >
                      {
                        ({ x2, y2 }) => {
                          const s2 = {
                            transform: `translate(${y2}px, ${y2}px) `
                          };

                          if (idx === 5) {
                            s2.transform = `translate(-${y2}px, ${y2}px) `;
                          }

                          if (idx === 6) {
                            s2.transform = `translate(-${y2}px, ${y2}px) scale(${x2 / 10})`;
                          }

                          if (idx <= 2) {
                            s2.transform += `scale(${10 / x}) `;
                          }

                          if (idx === 3) {
                            s2.transform += `scale(${x2 / 30}) `;
                          }

                          if (idx === 4 || idx === 5) {
                            s2.transform += `scale(${30 / x}) `;
                          }

                          return (
                            <div
                              className={styles.item}
                              style={s2}
                            >
                              <img className={styles.img} src={img} alt="React.js_logo.svg.png" />
                            </div>
                          );
                        }
                      }
                    </Motion>
                  </div>
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
