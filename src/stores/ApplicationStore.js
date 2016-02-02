import {BaseStore} from 'fluxible/addons';

class ApplicationStore extends BaseStore {
  static storeName = 'ApplicationStore';
  static handlers = {
    UPDATE_PAGE_TITLE: 'updatePageTitle'
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.pageTitle = '';
  }
  updatePageTitle(payload) {
    this.pageTitle = payload.pageTitle;
    this.emitChange();
  }
  getState() {
    return {
      pageTitle: this.pageTitle
    };
  }
  getPageTitle() {
    return this.pageTitle;
  }
  dehydrate() {
    return this.getState();
  }
  rehydrate(state) {
    this.pageTitle = state.pageTitle;
  }
}

export default ApplicationStore;
