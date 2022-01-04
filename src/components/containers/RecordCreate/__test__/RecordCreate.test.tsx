import React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import LoadingButton from '@mui/lab/LoadingButton';
import RecordCreate from '../RecordCreate';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@utils/records/ComputedDays');

const {
  weeklyComputedDays,
  monthlyComputedDays,
  quarterlyComputedDays,
} = require('@utils/records/ComputedDays');

describe('RecordCreate component', () => {
  let component: Enzyme.ShallowWrapper;
  let useDispatch: any;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    useDispatch = jest.spyOn(Redux, 'useDispatch');
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    // setState = jest.fn();
    // useStateSpy = jest.spyOn(React, 'useState');
    // // @ts-ignore
    // useStateSpy.mockImplementation((init) => [init, setState]);
    component = shallow(<RecordCreate />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render RecordCreate component', () => {
    expect(component).toMatchSnapshot();
  });
  it('Should call weeklyComputedDays when click Submit', () => {
    const selectPeriodValue = component.find(`[data-test='select-period-value']`);
    // @ts-ignore
    selectPeriodValue.props().setter('weekly');
    // @ts-ignore
    component.find(LoadingButton).props().onClick();
    expect(weeklyComputedDays).toHaveBeenCalled();
  });

  it('Should call monthlyComputedDays when click Submit', () => {
    const selectPeriodValue = component.find(`[data-test='select-period-value']`);
    // @ts-ignore
    selectPeriodValue.props().setter('monthly');
    // @ts-ignore
    component.find(LoadingButton).props().onClick();
    expect(monthlyComputedDays).toHaveBeenCalled();
  });

  it('Should call quarterlyComputedDays when click Submit', () => {
    const selectPeriodValue = component.find(`[data-test='select-period-value']`);
    // @ts-ignore
    selectPeriodValue.props().setter('quarterly');
    // @ts-ignore
    component.find(LoadingButton).props().onClick();
    expect(quarterlyComputedDays).toHaveBeenCalled();
  });
});
