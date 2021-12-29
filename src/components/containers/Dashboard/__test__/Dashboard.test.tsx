import * as React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Dashboard from '../Dashboard';
import RecordsAccordion from '@components/RecordsAccordion';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    recordList: [
      {
        id: '1',
        title: 'title of monthly remind',
        period: 'monthly',
        monthday: '8',
        holidays: 'afterHoliday',
        days: [1642366800000, 1644872400000],
      },
      {
        id: '2',
        title: 'title of quarterly remind',
        period: 'quarterly',
        monthday: '8',
        quarter: 'Янв, Апр, Июл, Окт',
        holidays: 'beforeHoliday',
        days: [1642366800000, 1644872400000],
      },
    ],
  })),
  // useDispatch: jest.fn(),
}));

const setUp = () => shallow(<Dashboard />);

describe('Dashboard component', () => {
  let component: Enzyme.ShallowWrapper;
  let useDispatchSpy: any;
  let mockDispatchFn: any;
  beforeEach(() => {
    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    component = setUp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Snapshot of Dashboard component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render RecordListRenderer component', () => {
    expect(component.find(RecordsAccordion)).toHaveLength(1);
    expect(useDispatchSpy).toHaveBeenCalled();
  });
});
