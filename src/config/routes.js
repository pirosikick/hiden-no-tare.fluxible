import Home from '../components/Home';
import About from '../components/About';
import Page from '../components/Page';

export default {
  home: {
    path: '/',
    method: 'get',
    handler: Home,
    label: 'Home',
    action: (context, payload, done) => {
      const pageTitle = 'Home | flux-examples | routing';
      context.dispatch('UPDATE_PAGE_TITLE', { pageTitle });
      done();
    }
  },
  about: {
    path: '/about',
    method: 'get',
    handler: About,
    label: 'About',
    action: (context, payload, done) => {
      const pageTitle = 'About | flux-examples | routing';
      context.dispatch('UPDATE_PAGE_TITLE', { pageTitle });
      done();
    }
  },
  dynamicpage: {
    path: '/page/:id',
    method: 'get',
    handler: Page,
    action: (context, payload, done) => {
      const id = payload.params.id;
      context.dispatch('LOAD_PAGE', { id });
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: `${id} [Dynamic Page] | flux-examples | routing`
      });
      done();
    }
  }
};
