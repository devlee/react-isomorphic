import React from 'react';

import { StaggeredMotion, spring } from 'react-motion';

import styles from './index.pcss';

const matrix = [
  0, 10, 20,
  10, 20, 40,
  20, 40, 80
];

const custom = { stiffness: 10, damping: 22 };

const width = 100;

const margin = 10;

export default class DemoItem1 extends React.PureComponent {
  render() {
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
                        left: `${((i % 3) * (width + (margin * 2)))}px`,
                        top: `${(Math.floor(i / 3) * (width + (margin * 2)))}px`
                      }}
                    >
                      <div
                        className={styles.subItem}
                        style={{
                          transform: `scale(${x > matrix[i] ? ((x - matrix[i]) / width) : 0})`,
                          backgroundColor: `${x > (80 + matrix[i]) ? 'white' : '#00bcd4'}`
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
