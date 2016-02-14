import {Router} from 'express';
import {renderToString} from 'react-dom/server';
import {navigateAction} from 'fluxible-router';
import {createElementWithContext} from 'fluxible-addons-react';
import serialize from 'serialize-javascript';
import app from '../../app';

const router = Router();

router.use((req, res, next) => {
  const context = app.createContext();

  context.executeAction(navigateAction, { url: req.url }, (err) => {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        next();
      } else {
        next(err);
      }
      return;
    }

    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    res.render('layout', {
      state: exposed,
      markup: renderToString(createElementWithContext(context)),
      context: context.getComponentContext()
    });
    res.end();
  });
});

export default router;
