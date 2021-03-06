import Router from 'koa-router';

import middleware from '../middleware';

import data from './data';

import main from './main';

const router = new Router();

router.use(middleware.cookie);

data(router);

main(router);

export default router;
