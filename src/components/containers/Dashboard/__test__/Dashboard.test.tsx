import React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jsdom-global/register';
import Enzyme, { shallow } from 'enzyme';
import { CircularProgress } from '@mui/material';
import Dashboard from '../Dashboard';
import RecordsAccordion from '@components/RecordsAccordion';

Enzyme.configure({ adapter: new Adapter() });

const recordListParam = [
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
];

const createSelector = (loading: boolean, recordList = recordListParam) => ({
  recordList,
  loading,
  error: false,
});

describe('Dashboard component', () => {
  let useEffect: any;
  let useDispatch: any;
  let useSelector: any;
  let mockDispatch: jest.Mock;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    useDispatch = jest.spyOn(Redux, 'useDispatch');
    useSelector = jest.spyOn(Redux, 'useSelector');
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Snapshot of Dashboard component', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Dashboard />);
    expect(component).toMatchSnapshot();
  });

  it('Should render RecordsAccordion component', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Dashboard />);
    expect(component.find(RecordsAccordion)).toHaveLength(1);
  });

  it('Should work "useEffect"', () => {
    useSelector.mockReturnValue(createSelector(false));
    mockUseEffect();
    shallow(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should dispatch deleteRecordWithFirebase', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Dashboard />);
    component.find(RecordsAccordion).props().handleDelete(null, '123');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should render CircularProgress when loading', () => {
    useSelector.mockReturnValue(createSelector(true));
    const component = shallow(<Dashboard />);
    expect(component.find(CircularProgress)).toHaveLength(1);
  });

  it('Should show a phrase about an empty recordList', () => {
    useSelector.mockReturnValue(createSelector(false, []));
    const component = shallow(<Dashboard />);
    expect(component.find(`[data-test='empty-list']`)).toHaveLength(1);
  });
});
