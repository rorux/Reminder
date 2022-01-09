import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Modal, { BootstrapDialogTitle } from '../Modal';

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
  {
    id: '3',
    title: 'title of weekly remind',
    period: 'weekly',
    weekday: '1',
    holidays: 'beforeHoliday',
    days: [1642366800000, 1644872400000],
  },
];

const setUp = () => shallow(<Modal />);
describe('Modal component', () => {
  let component: Enzyme.ShallowWrapper;
  let spyOnUseDispatch: any;
  let mockDispatch: jest.Mock;
  let useSelector: any;

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    useSelector = jest.spyOn(redux, 'useSelector');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render Modal component', () => {
    useSelector.mockReturnValue({
      isModalRecordsOpen: false,
      modalRecords: recordListParam,
      modalDate: 123,
    });
    component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('handleClose should dispatch action', () => {
    useSelector.mockReturnValue({
      isModalRecordsOpen: true,
      modalRecords: recordListParam,
      modalDate: 123,
    });
    component = setUp();
    // @ts-ignore
    component.find(`[data-test='dialog']`).props().onClose();
    expect(mockDispatch).toHaveBeenCalled();
  });
});

describe('BootstrapDialogTitle component', () => {
  it('Should render BootstrapDialogTitle component with "onClose"', () => {
    expect(shallow(<BootstrapDialogTitle id={'id'} onClose={jest.fn()} />)).toMatchSnapshot();
  });
});
