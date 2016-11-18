import path from 'path';

import koaFavicon from 'koa-favicon';

const rootFolder = path.resolve(__dirname, '../../../..');

export default koaFavicon(path.join(rootFolder, '/static/favicon.ico'));
