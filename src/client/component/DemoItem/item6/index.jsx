import React from 'react';

import { autobind } from 'core-decorators';

import { Motion, spring } from 'react-motion';

import styles from './index.pcss';

const custom = { stiffness: 100, damping: 20 };

const count = 3;

function reinsert(arr, from, to) {
  const result = arr.slice(0);
  const val = result[from];
  result.splice(from, 1);
  result.splice(to, 0, val);
  return result;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

// Fork - https://github.com/chenglou/react-motion/blob/master/demos/demo8-draggable-list/Demo.jsx
export default class DemoItem6 extends React.PureComponent {
  state = {
    range: Array.from(new Array(count), (_, i) => i),
    isPressed: false,
    lastPressedIdx: 0,
    mouseY: 0,
    disY: 0
  };

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  @autobind
  handleMouseDown({ pageY }, pressIdx, pressY) {
    this.setState({
      disY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      lastPressedIdx: pressIdx,
    });
  }

  @autobind
  handleTouchStart({ touches }, pressIdx, pressY) {
    this.handleMouseDown(touches[0], pressIdx, pressY);
  }

  @autobind
  handleMouseMove({ pageY }) {
    const { isPressed, disY, range, lastPressedIdx } = this.state;
    if (isPressed) {
      const mouseY = pageY - disY;
      const currentRow = clamp(Math.round(mouseY / 120), 0, count - 1);

      if (currentRow !== range.indexOf(lastPressedIdx)) {
        const newRange = reinsert(range, range.indexOf(lastPressedIdx), currentRow);
        this.setState({ mouseY: mouseY, range: newRange });
      } else {
        this.setState({ mouseY: mouseY });
      }
    }
  }

  @autobind
  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  @autobind
  handleMouseUp() {
    this.setState({ isPressed: false, disY: 0 });
  }

  render() {
    const { range, isPressed, lastPressedIdx, mouseY } = this.state;

    return (
      <div className="demo-item-content-component">
        <div className={styles.area}>
          <div className={styles.list}>
            {
              range.map((i, idx) => {
                const target = isPressed && (lastPressedIdx === i)
                  ? {
                    scale: spring(1.05, custom),
                    shadow: spring(4, custom),
                    y: mouseY
                  } : {
                    scale: spring(1, custom),
                    shadow: spring(0, custom),
                    y: spring(range.indexOf(i) * 120, custom)
                  };

                return (
                  <Motion
                    style={target}
                    key={i}
                  >
                    {
                      ({ scale, shadow, y }) => {
                        const style = {
                          boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                          transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                          WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                          zIndex: i === lastPressedIdx ? count : i
                        };

                        if (shadow > 0.5) {
                          style.borderRadius = '2px';
                        } else if (idx === 0) {
                          style.borderTopLeftRadius = '2px';
                          style.borderTopRightRadius = '2px';
                        } else if (idx === (count - 1)) {
                          style.borderBottomLeftRadius = '2px';
                          style.borderBottomRightRadius = '2px';
                        } else {
                          style.borderRadius = '0';
                        }

                        return (
                          <div
                            data-key={i}
                            data-idx={idx}
                            className={styles.item}
                            onMouseDown={(e) => { this.handleMouseDown(e, i, y); }}
                            onTouchStart={(e) => { this.handleTouchStart(e, i, y); }}
                            style={style}
                          >{i + 1}</div>
                        );
                      }
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
