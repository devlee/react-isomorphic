import Router from 'koa-router';

import React from 'react';

import { renderToString } from 'react-dom/server';

import { RouterContext, match } from 'react-router';

import route from '../../client/route';

const router = new Router();

router.get('/', async ctx => {
  let isomorphicHtml;

  await match({
    routes: route(),
    location: ctx.req.url
  }, (err, redirectLocation, renderProps) => {
    isomorphicHtml = renderToString(
      <RouterContext {...renderProps} />
    );
  });

  ctx.body = await ctx.render('app', {
    isomorphicHtml
  });
});

export default router;
