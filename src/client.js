import './global';
import {render} from 'react-dom';
import app from './app';
import { createElementWithContext } from 'fluxible-addons-react';

const dehydratedState = window.App;

app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }

  window.context = context;
  render(createElementWithContext(context), document.getElementById('app'));
});
