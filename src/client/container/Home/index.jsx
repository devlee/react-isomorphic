import React from 'react';

class Home extends React.PureComponent {
  render() {
    return (
      <div className="container home-component">
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

export default Home;
