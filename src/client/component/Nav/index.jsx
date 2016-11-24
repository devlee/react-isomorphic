import React from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import { Tabs, Tab } from 'material-ui';

import selector from '../../selector/nav';

@connect(selector)
@autobind
export default class Nav extends React.PureComponent {
  static propTypes = {
    langPack: React.PropTypes.object,
    location: React.PropTypes.object
  }

  state = {
    value: 'home'
  }

  componentWillMount() {
    const { langPack, location } = this.props;

    Object.keys(langPack.nav).map(item => {
      if (location.pathname === '/' && item === 'home') {
        this.changeTab(item);
      } else if (location.pathname === item || location.pathname === `/${item}`) {
        this.changeTab(item);
      }

      return item;
    });
  }

  @autobind
  changeTab(v) {
    this.state = {
      value: v
    };
  }

  render() {
    const { langPack } = this.props;

    const { value } = this.state;

    return (
      <Tabs onChange={this.changeTab} value={value}>
        {
          Object.keys(langPack.nav).map((item, i) => {
            return (
              <Tab
                key={i}
                value={item}
                label={langPack.nav[item]}
                containerElement={
                  <Link to={item}>{langPack.nav[item]}</Link>
                }
              />
            );
          })
        }
      </Tabs>
    );
  }
}
