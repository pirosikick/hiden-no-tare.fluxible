import {BaseStore} from 'fluxible/addons';

class TimeStore extends BaseStore {
  static storeName = 'TimeStore';
  static handlers = {
    'NAVIGATE_START': 'handleTimeChange',
    'UPDATE_TIME': 'handleTimeChange'
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.time = new Date();
  }
  handleTimeChange(payload) {
    this.time = new Date();
    this.emitChange();
  }
  getState() {
    return {
      time: this.time.toString()
    };
  }
  dehydrate() {
    return this.getState();
  }
  rehydrate(state) {
    this.time = new Date(state.time);
  }
}

export default TimeStore;
