import path from 'path';

import koaStatic from 'koa-static';

const rootFolder = path.resolve(__dirname, '../../../..');

export default koaStatic(path.join(rootFolder, '/build'), { index: false });
