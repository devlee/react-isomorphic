import config from '../../../../config';

const assetConfig = config.asset;

const locals = (host) => {
  const env = process.env.NODE_ENV || 'development';
  const port = assetConfig[env].port;
  const prefix = assetConfig[env].prefix;
  return {
    css: (name) => {
      return env === 'development' ?
      `<link rel="stylesheet" src="//${host}:${port}${prefix}/${name}.css" />` :
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
