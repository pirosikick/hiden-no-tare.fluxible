import '../../src/global';
import test from 'ava';
import {shallow, render} from 'enzyme';
import {createMockComponentContext} from 'fluxible/utils';
import provideContext from 'fluxible-addons-react/provideContext';
import _Timestamp from '../../src/components/Timestamp.jsx';
import TimeStore from '../../src/stores/TimeStore';

const Timestamp = provideContext(_Timestamp);

test.beforeEach(t => {
  t.context = createMockComponentContext({
    stores: [TimeStore]
  });
});

test(t => {
  const state = t.context.getStore(TimeStore).getState();
  const $ = render(<Timestamp context={t.context}/>);
  t.is($.text(), state.time);
});
