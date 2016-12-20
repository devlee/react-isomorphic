import ssl from 'koa-sslify';

import config from '../../../../config';

import { env, isPwa } from '../../../universal/env';

const serverConfig = config.server;

const serverSSLPort = serverConfig[env].ports;

const sslMiddleware = isPwa ? ssl({
  port: serverSSLPort
}) : async (ctx, next) => {
  await next();
};

export default sslMiddleware;
