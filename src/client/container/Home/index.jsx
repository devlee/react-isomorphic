import React from 'react';

import { StaggeredMotion, spring } from 'react-motion';

import styles from './index.pcss';

const matrix = [
  0, 10, 20,
  10, 20, 40,
  20, 40, 80
];

const custom = { stiffness: 80, damping: 22 };

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container home-component">
        <h1>Home Component</h1>
        <StaggeredMotion
          defaultStyles={Array.from(new Array(9), () => {
            return {
              x: 0,
              y: 0
            };
          })}
          styles={prevStyles => {
            return prevStyles.map((_, i) => {
              return {
                x: spring(100 + matrix[i], custom),
                y: spring(100 + matrix[i], custom)
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
                        width: '100px',
                        height: '100px',
                        left: `${((i % 3) * 120)}px`,
                        top: `${(Math.floor(i / 3) * 120)}px`
                      }}
                    >
                      <div
                        className={styles.subItem}
                        style={{
                          width: `${x > matrix[i] ? x - matrix[i] : 0}px`,
                          height: `${y > matrix[i] ? y - matrix[i] : 0}px`,
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
