import React from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import { Drawer, Menu, MenuItem, AppBar, FlatButton } from 'material-ui';

import muiThemeable from 'material-ui/styles/muiThemeable';

import selector from '../../selector/nav';

import styles from './index.pcss';

import { siteName } from '../../../../config';

import { isPwa } from '../../../universal/env';

function openGithub() {
  window.open('https://github.com');
}

const white = 'rgba(255, 255, 255, 1)';

const homePageKey = 'home';

function isHomePage(item) {
  return item === homePageKey;
}

@connect(selector)
@muiThemeable()
@autobind
export default class Nav extends React.PureComponent {
  static propTypes = {
    langPack: React.PropTypes.object,
    location: React.PropTypes.object,
    muiTheme: React.PropTypes.object
  };

  state = {
    value: homePageKey,
    title: '',
    open: false,
    color: white,
    bgColor: white
  };

  componentWillMount() {
    const { langPack, location } = this.props;

    Object.keys(langPack.nav).map(item => {
      if (
        (location.pathname === '/' && isHomePage(item)) ||
        location.pathname.indexOf(item) === 0 ||
        location.pathname.indexOf(`/${item}`) === 0
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
      if (v.indexOf(item) === 0) {
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
      bgColor: white,
      title
    });
  }

  @autobind
  toggleDrawer() {
    this.setState({
      open: !this.state.open,
      bgColor: white
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
      bgColor: `rgba(${r}, ${g}, ${b}, 1)`
    });
  }

  render() {
    const { langPack, muiTheme } = this.props;

    const { value, title, color, bgColor } = this.state;

    const primary = true;

    const flatButtonStyle = {
      height: 64,
      width: '100%',
      backgroundColor: bgColor === white ? muiTheme.palette.primary1Color : bgColor,
      borderRadius: 0
    };

    const flatButtonLabelStyle = {
      fontSize: '20px',
      color: color
    };

    const menuStyle = {
      height: 'calc(100% - 64px)',
      overflowY: 'auto'
    };

    const pwaStr = isPwa ? ' [PWA mode]' : '';

    return (
      <div className="nav-component">
        <AppBar
          title={title + pwaStr}
          onLeftIconButtonTouchTap={this.toggleDrawer}
          onRightIconButtonTouchTap={openGithub}
          iconClassNameRight="muidocs-icon-custom-github"
        />
        <Drawer
          docked={false}
          width={56 * 5}
          containerStyle={{
            overflow: 'hidden'
          }}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open, bgColor: white })}
        >
          <FlatButton
            label={siteName}
            primary={primary}
            style={flatButtonStyle}
            labelStyle={flatButtonLabelStyle}
            onClick={this.randomColor}
          />
          <Menu onChange={(e, v) => { this.changeValue(v); }} value={value} style={menuStyle}>
            {
              Object.keys(langPack.nav).map((item, i) => {
                return (
                  <MenuItem key={i} value={item} onTouchTap={this.handleClose}>
                    <Link to={`/${item}`} className={styles.menuItemLink}>
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
