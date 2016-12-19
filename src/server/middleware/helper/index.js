import config from '../../../../config';

import { env, isPwa, isDev } from '../../../universal/env';

const assetConfig = config.asset;

const port = isPwa ? '' : `:${assetConfig[env].port}`;

const prefix = assetConfig[env].prefix;

const locals = (host) => {
  return {
    css: (name) => {
      return isDev ?
      `<link rel="stylesheet" href="//${host}${port}${prefix}${name}.css" />` :
      'todo'; // TODO 自定义配置生产环境
    },
    script: (name) => {
      return isDev ?
      `<script src="//${host}${port}${prefix}${name}.js"></script>` :
      'todo'; // TODO 自定义配置生产环境
    }
  };
};

const helperMiddleware = async (ctx, next) => {
  ctx.locals = ctx.locals || locals(ctx.hostname);
  await next();
};

export default helperMiddleware;
