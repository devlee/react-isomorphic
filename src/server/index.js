import Koa from 'koa';

import fs from 'fs';

import http from 'http';

import https from 'https';

import path from 'path';

import middleware from './middleware';

import router from './route';

import config from '../../config';

import { env } from '../universal/env';

const rootFolder = path.resolve(__dirname, '../..');

export default () => {
  const httpsApp = new Koa();
  const httpApp = new Koa();
  const serverConfig = config.server;
  const options = {
    key: fs.readFileSync(path.resolve(rootFolder, './config/server/ssl/devlee.io.key')),
    cert: fs.readFileSync(path.resolve(rootFolder, './config/server/ssl/devlee.io.crt'))
  };

  httpApp.use(ctx => {
    ctx.status = 301;
    ctx.redirect(`https://${ctx.hostname}:${serverConfig[env].ports}${ctx.path}${ctx.search}`);
    ctx.body = 'Redirecting to https';
  });

  middleware.intl(httpsApp);

  httpsApp.use(middleware.error)
     .use(middleware.ssl)
     .use(middleware.favicon)
     .use(middleware.static)
     .use(middleware.helper)
     .use(middleware.navigator)
     .use(middleware.view)
     .use(router.routes())
     .use(router.allowedMethods());

  middleware.io(httpsApp);

  http.createServer(httpApp.callback()).listen(serverConfig[env].port, () => {
    console.log(`http app start at port ${serverConfig[env].port}`);
  });

  https.createServer(
    options,
    httpsApp.callback()
  ).listen(serverConfig[env].ports,
    () => {
      console.log(`https app start at port ${serverConfig[env].ports}`);
    }
  );
};
