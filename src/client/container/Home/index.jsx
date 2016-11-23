import React from 'react';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import selector from '../../selector/home';

@connect(selector)
@autobind
export default class Home extends React.PureComponent {
  static propTypes = {
    langPack: React.PropTypes.object
  }

  render() {
    const { langPack } = this.props;

    return (
      <div className="container home-component">
        <nav>
          <ul>
            <li>{ langPack.nav.home }</li>
          </ul>
        </nav>
        <h1>Home Component</h1>
        <section>
          <h2>SSR Speed Up</h2>
          <ul>
            <li>NODE_ENV=production node index.js</li>
            <li>import ReactDOMServer from react/dist/react.min</li>
            <li>
              Babel Transform transform-react-constant-elements
              [CONSTANT MUST BEFORE INLINE] transform-react-inline-elements
            </li>
            <li>Avoid createClass Use ES6 class</li>
            <li>Streaming react-dom-stream</li>
            <li>Cache Components</li>
          </ul>
        </section>
        <section>
          <h2>RxJS + React + Redux</h2>
        </section>
      </div>
    );
  }
}
