import { appSelector } from '../selectors';
import { rootStateForTesting } from '@store/types';

describe('App selector testing', () => {
  it('Should generate correct selector', () => {
    expect(appSelector(rootStateForTesting)).toEqual({
      isDrawerOpen: false,
      isModalRecordsOpen: false,
      modalRecords: [],
      modalDate: null,
    });
  });
});
