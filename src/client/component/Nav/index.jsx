import React from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import { Drawer, Menu, MenuItem, AppBar, FlatButton } from 'material-ui';

import selector from '../../selector/nav';

import styles from './index.pcss';

import { siteName } from '../../../../config';

function openGithub() {
  window.open('https://github.com');
}

const white = 'rgba(255, 255, 255, 1)';

const homePageKey = 'home';

function isHomePage(item) {
  return item === homePageKey;
}

@connect(selector)
@autobind
export default class Nav extends React.PureComponent {
  static propTypes = {
    langPack: React.PropTypes.object,
    location: React.PropTypes.object
  }

  state = {
    value: homePageKey,
    title: '',
    open: false,
    color: white
  }

  componentWillMount() {
    const { langPack, location } = this.props;

    Object.keys(langPack.nav).map(item => {
      if (
        (location.pathname === '/' && isHomePage(item)) ||
        location.pathname === item ||
        location.pathname === `/${item}`
      ) {
        this.changeValue(item);
      }

      return item;
    });
  }

  @autobind
  getTitleByValue(v) {
    const { langPack } = this.props;

    let title = '';

    Object.keys(langPack.nav).map(item => {
      if (v === item) {
        title = langPack.nav[item];
      }

      if (isHomePage(item)) {
        title = siteName;
      }

      return item;
    });

    return title;
  }

  @autobind
  changeValue(v) {
    const title = this.getTitleByValue(v);

    this.setState({
      value: v,
      color: white,
      title
    });
  }

  @autobind
  toggleDrawer() {
    this.setState({
      open: !this.state.open
    });
  }

  @autobind
  handleClose() {
    this.setState({
      open: false
    });
  }

  @autobind
  randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    this.setState({
      color: `rgba(${r}, ${g}, ${b}, 1)`
    });
  }

  render() {
    const { langPack } = this.props;

    const { value, title, color } = this.state;

    const primary = true;

    const flatButtonStyle = {
      height: 64,
      width: '100%',
      backgroundColor: color,
      borderRadius: 0
    };

    const flatButtonLabelStyle = {
      fontSize: '20px',
      color: 'white'
    };

    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={this.toggleDrawer}
          onRightIconButtonTouchTap={openGithub}
          iconClassNameRight="muidocs-icon-custom-github"
        />
        <Drawer
          docked={false}
          width={280}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open, color: white })}
        >
          <FlatButton
            label={siteName}
            primary={primary}
            style={flatButtonStyle}
            labelStyle={flatButtonLabelStyle}
            onClick={this.randomColor}
          />
          <Menu onChange={(e, v) => { this.changeValue(v); }} value={value}>
            {
              Object.keys(langPack.nav).map((item, i) => {
                return (
                  <MenuItem key={i} value={item} onTouchTap={this.handleClose}>
                    <Link to={item} className={styles.menuItemLink}>
                      {langPack.nav[item]}
                    </Link>
                  </MenuItem>
                );
              })
            }
          </Menu>
        </Drawer>
      </div>
    );
  }
}
