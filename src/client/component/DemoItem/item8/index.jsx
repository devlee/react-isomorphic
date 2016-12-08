import React from 'react';

import { Motion, spring } from 'react-motion';

import { autobind } from 'core-decorators';

import styles from './index.pcss';

const customw = { stiffness: 100, damping: 22 };

const customh = { stiffness: 44, damping: 20 };

export default class DemoItem8 extends React.PureComponent {
  state = {
    target1: {
      w: 400,
      h: 400
    },
    target2: {
      w: 150,
      h: 200
    },
    current: 2
  }

  @autobind
  handleClick(e) {
    e.preventDefault();
    const { current } = this.state;
    this.setState({
      current: current === 1 ? 2 : 1
    });
  }

  render() {
    const { current } = this.state;

    const target = this.state[`target${current}`];

    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <Motion
            style={{
              w: spring(target.w, customw),
              h: spring(target.h, customh)
            }}
          >
            {
              ({ w, h }) => {
                const x1 = 500 - w;
                const y1 = 500 - h;
                if (current === 2) {
                  customw.stiffness = ((h / 400) * 30) + 100;
                  customh.stiffness = ((w / 400) * 30) + 44;
                } else {
                  customw.stiffness = ((w / 400) * 30) + 44;
                  customh.stiffness = ((h / 400) * 30) + 60;
                }
                return (
                  <a
                    href=""
                    onClick={this.handleClick}
                    className={styles.item}
                    style={{
                      width: `${w}px`,
                      height: `${h}px`,
                      background: '#00bcd4',
                      display: 'inline-block',
                      transform: `translate3d(${x1}px, ${y1}px, 0)`
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'red',
                        borderRadius: '100%',
                        display: 'inline-block',
                        marginTop: '50px',
                        marginLeft: '50px'
                      }}
                    >
                    </div>
                    <div
                      style={{
                        width: '80%',
                        height: '20px',
                        background: '#eee',
                        margin: '20px'
                      }}
                    ></div>
                    <div
                      style={{
                        width: '80%',
                        height: '20px',
                        background: '#eee',
                        margin: '20px'
                      }}
                    ></div>
                    <div
                      style={{
                        width: '80%',
                        height: '20px',
                        background: '#eee',
                        margin: '20px'
                      }}
                    ></div>
                  </a>
                );
              }
            }
          </Motion>
        </div>
      </div>
    );
  }
}
