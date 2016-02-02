import './global';

import path from 'path';
import express from 'express';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import {createElement} from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import {createElementWithContext} from 'fluxible-addons-react';

const server = express();

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.resolve(__dirname, '..', 'dist')));
} else {
  server.use(express.static(path.resolve(__dirname, '..', '.tmp')));
  server.use(express.static(path.resolve(__dirname, '..', 'public')));
}

server.use((req, res, next) => {
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

    const html = renderToStaticMarkup(createElement(HtmlComponent, {
      state: exposed,
      markup: renderToString(createElementWithContext(context)),
      context: context.getComponentContext()
    }));

    res.send(html);
  });
});

export function listen(port) { server.listen(port); };
