import React from 'react';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

const custom = { stiffness: 100, damping: 40 };

export default class DemoItem7 extends React.PureComponent {
  render() {
    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(90, custom) }}
          >
            {
              ({ x }) => {
                const style = {};
                style.transform = `rotate(${x * (-1)}deg)`;
                style.color = '#00bcd4';
                style.fontSize = '20px';
                style.boxShadow = `${((x) / 90) * (-2)}px ${(((90 - x) / 90) * 3) + 1}px 6px rgba(0, 0, 0, 0.12)`;

                return (
                  <div
                    style={{
                      transformOrigin: '0 0 0',
                      transform: `rotate(${(x / 3) * (-1)}deg)`,
                      width: '100px',
                      height: '100px',
                      position: 'absolute',
                      top: `${(x / 90) * 102 * (-1)}px`,
                      left: `${(x / 90) * 230 * (1)}px`
                    }}
                  >
                    <div
                      className={styles.itemWrapper}
                      style={{
                        transform: `rotate(${x / 3}deg)`
                      }}
                    >
                      <div
                        className={styles.item}
                        style={style}
                      >
                        Demo7
                      </div>
                    </div>
                  </div>
                );
              }
            }
          </Motion>
        </div>
      </div>
    );
  }
}
