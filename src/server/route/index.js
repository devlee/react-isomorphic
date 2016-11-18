import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  ctx.body = await ctx.render('app', {
    user: 'devlee'
  });
});

export default router;
