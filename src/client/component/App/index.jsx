import React from 'react';

class App extends React.PureComponent {
  render() {
    return (
      <div className="root app-component">
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
