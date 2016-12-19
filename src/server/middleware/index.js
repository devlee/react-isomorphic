// for koa

import error from './error';

import favicon from './favicon';

import helper from './helper';

import view from './view';

import intl from './intl';

import navigator from './navigator';

import io from './io';

import serverStatic from './static';

import ssl from './ssl';

// for koa-router

import secure from './secure';

import cookie from './cookie';

import cache from './cache';

export default {
  error,
  view,
  favicon,
  helper,
  intl,
  navigator,
  io,
  static: serverStatic,
  ssl,
  secure,
  cookie,
  cache
};
