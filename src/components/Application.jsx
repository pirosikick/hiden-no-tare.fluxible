import {Component} from 'react';
import Nav from './Nav';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores, provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';

class Application extends Component {
  static contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
  }
  componentDidUpdate(prevProps) {
    let newProps = this.props;
    if (newProps.ApplicationStore.pageTitle === prevProps.ApplicationStore.pageTitle) {
      return;
    }
    document.title = newProps.ApplicationStore.pageTitle;
  }
  render() {
    var Handler = this.props.currentRoute.handler;
    //render content
    return (
      <div>
        <Nav />
        <Handler />
        <Timestamp />
      </div>
    );
  }
}

Application = connectToStores(Application, [ApplicationStore], context => ({
  ApplicationStore: context.getStore(ApplicationStore).getState()
}));
Application = provideContext(Application);
Application = handleHistory(Application, {enableScroll: false});

export default Application;
