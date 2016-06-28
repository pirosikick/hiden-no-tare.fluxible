import test from 'ava';
import {createMockActionContext} from 'fluxible/utils';
import updateTime from '../../src/actions/updateTime';

test(t => {
  t.plan(3);
  const context = createMockActionContext();
  updateTime(context, null, () => {
    t.is(context.dispatchCalls.length, 1);
    t.is(context.dispatchCalls[0].name, 'UPDATE_TIME');
    t.falsy(context.dispatchCalls[0].payload);
  });
});
