import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import AppBar from '../AppBar';
import Typography from '@mui/material/Typography';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '/dashboard',
  })),
}));

describe('AppBar component', () => {
  let component: Enzyme.ShallowWrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({
      isDrawerOpen: false,
    });
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
    component = shallow(<AppBar />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render not Edit page', () => {
    expect(component.find(Typography)).toHaveLength(1);
    expect(component.find(Typography).text()).toBe('Напоминания');
  });
});
