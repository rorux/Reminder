import React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import 'jsdom-global/register';
import Enzyme, { shallow } from 'enzyme';
import { CircularProgress } from '@mui/material';
import Calendar from '../Calendar';

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
  let setState: any;
  let useStateSpy;
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
    setState = jest.fn();
    useStateSpy = jest.spyOn(React, 'useState');
    // @ts-ignore
    useStateSpy.mockImplementation((init) => [init, setState]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Snapshot of Dashboard component', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Calendar />);
    expect(component).toMatchSnapshot();
  });

  it('Should work "useEffect"', () => {
    useSelector.mockReturnValue(createSelector(false));
    mockUseEffect();
    shallow(<Calendar />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should render CircularProgress when loading', () => {
    useSelector.mockReturnValue(createSelector(true));
    const component = shallow(<Calendar />);
    expect(component.find(CircularProgress)).toHaveLength(1);
  });

  it('Should change state when click "button-next"', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Calendar />);
    // @ts-ignore
    component.find(`[data-test='button-next']`).props().onClick();
    expect(setState).toHaveBeenCalled();
  });

  it('Should change state when click "button-before"', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Calendar />);
    // @ts-ignore
    component.find(`[data-test='button-before']`).props().onClick();
    expect(setState).toHaveBeenCalled();
  });

  it('Should work correct when month is january', () => {
    // @ts-ignore
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      getFullYear: jest.fn(() => 2022),
      getMonth: jest.fn(() => 0),
    }));

    useSelector.mockReturnValue(createSelector(false));
    mockUseEffect();
    mockUseEffect();

    const component = shallow(<Calendar />);
    // @ts-ignore
    component.find(`[data-test='button-next']`).props().onClick();
    expect(setState).toHaveBeenCalledWith(1);
  });

  it('Should work correct when month is december', () => {
    // @ts-ignore
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      getFullYear: jest.fn(() => 2022),
      getMonth: jest.fn(() => 11),
    }));

    useSelector.mockReturnValue(createSelector(false));
    mockUseEffect();
    mockUseEffect();

    const component = shallow(<Calendar />);
    // @ts-ignore
    component.find(`[data-test='button-before']`).props().onClick();
    expect(setState).toHaveBeenCalledWith(10);
  });
});
