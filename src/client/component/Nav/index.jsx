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
    langPack: React.PropTypes.object
  }

  @autobind
  state = {
    value: 0
  }

  @autobind
  changeTab(v) {
    this.state = {
      value: v
    };
  }

  render() {
    const { langPack } = this.props;

    return (
      <Tabs onChange={this.changeTab} value={this.value}>
        {
          Object.keys(langPack.nav).map((item, i) => {
            return (
              <Tab
                key={i}
                value={i}
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
