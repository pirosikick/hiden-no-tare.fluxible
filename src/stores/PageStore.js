import {BaseStore} from 'fluxible/addons';

class PageStore extends BaseStore {
  static storeName = 'PageStore';
  static handlers = {
    'LOAD_PAGE': 'handleContentChange'
  };


  constructor(dispatcher) {
    super(dispatcher);
    this.content = 'initial content...';
  }
  handleContentChange(payload) {
    this.content = 'content for page with id '+payload.id;
    this.emitChange();
  }
  getState() {
    return {
      content: this.content
    };
  }
  dehydrate() {
    return this.getState();
  }
  rehydrate(state) {
    this.content = state.content;
  }
}

export default PageStore;
