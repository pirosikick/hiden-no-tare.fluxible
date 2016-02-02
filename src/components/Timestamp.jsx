import updateTime from '../actions/updateTime';
import TimeStore from '../stores/TimeStore';
import {connectToStores} from 'fluxible-addons-react';

class Timestamp extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  };
  constructor(props, context) {
    super(props, context);
    this.onReset = this.onReset.bind(this);
  }
  onReset() {
    this.context.executeAction(updateTime);
  }
  render() {
    return (
      <em onClick={this.onReset} style={{fontSize: '.8em'}}>{this.props.time}</em>
    );
  }
}

Timestamp = connectToStores(
  Timestamp,
  [TimeStore],
  context => context.getStore(TimeStore).getState()
);

export default Timestamp;
