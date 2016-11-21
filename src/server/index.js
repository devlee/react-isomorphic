import Koa from 'koa';

import middleware from './middleware';

import router from './route';

import config from '../../config';

export default () => {
  const app = new Koa();
  const serverConfig = config.server;
  const env = process.env.NODE_ENV || 'development';

  app.use(middleware.error)
     .use(middleware.favicon)
     .use(middleware.helper)
     .use(middleware.view)
     .use(router.routes())
     .use(router.allowedMethods());

  app.listen(serverConfig[env].port, () => {
    console.log(`app start at port ${serverConfig[env].port}`);
  });
};
