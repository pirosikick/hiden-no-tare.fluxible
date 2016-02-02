import Fluxible from 'fluxible';
import Application from './components/Application';
import RouteStore from './stores/RouteStore';
import ApplicationStore from './stores/ApplicationStore';
import TimeStore from './stores/TimeStore';
import PageStore from './stores/PageStore';

const app = new Fluxible({
  component: Application,
  stores: [
    RouteStore,
    ApplicationStore,
    TimeStore,
    PageStore
  ]
});

export default app;
