import React from 'react';

import { StaggeredMotion, spring } from 'react-motion';

import styles from './index.pcss';

const matrix = [
  0, 80, 160, 320,
  80, 160, 320, 640
];

const col = 4;

const custom = { stiffness: 100, damping: 20 };

const width = 100;

const margin = 10;

export default class DemoItem1 extends React.PureComponent {
  render() {
    /* eslint-disable no-bitwise */
    return (
      <div className="demo-item-content-component">
        <StaggeredMotion
          defaultStyles={Array.from(matrix, () => {
            return {
              x: 0,
              y: 0
            };
          })}
          styles={prevStyles => {
            return prevStyles.map((_, i) => {
              return {
                x: spring(width + matrix[i], custom),
                y: spring(width + matrix[i], custom)
              };
            });
          }}
        >
          {
            list => (
              <div className={styles.list}>
                {
                  list.map(({ x, y }, i) => (
                    <div
                      className={styles.item}
                      key={i}
                      style={{
                        left: `${((i % col) * (width + (margin * 2)))}px`,
                        top: `${(~~(i / col) * (width + (margin * 2)))}px`
                      }}
                    >
                      <div
                        className={styles.subItem}
                        style={{
                          transform: `scale(${x > matrix[i] ? ((x - matrix[i]) / width) : 0})`,
                          backgroundColor: `${x > (80 + matrix[i]) ? '#00bcd4' : '#00bcd4'}`
                        }}
                      ></div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </StaggeredMotion>
      </div>
    );
  }
}
