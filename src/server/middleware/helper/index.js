import config from '../../../../config';

import { env, isPwa } from '../../../universal/env';

const assetConfig = config.asset;

const serverConfig = config.server;

const port = isPwa ? serverConfig[env].port : assetConfig[env].port;

const prefix = assetConfig[env].prefix;

const locals = (host) => {
  return {
    css: (name) => {
      return env === 'development' ?
      `<link rel="stylesheet" href="//${host}:${port}${prefix}/${name}.css" />` :
      'todo'; // TODO 自定义配置生产环境
    },
    script: (name) => {
      return env === 'development' ?
      `<script src="//${host}:${port}${prefix}/${name}.js"></script>` :
      'todo'; // TODO 自定义配置生产环境
    }
  };
};

const helperMiddleware = async (ctx, next) => {
  ctx.locals = ctx.locals || locals(ctx.request.hostname);
  await next();
};

export default helperMiddleware;
