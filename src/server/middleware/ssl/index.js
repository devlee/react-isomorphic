import ssl from 'koa-sslify';

import config from '../../../../config';

import { env } from '../../../universal/env';

const serverConfig = config.server;

const serverSSLPort = serverConfig[env].ports;

export default ssl({
  port: serverSSLPort
});
