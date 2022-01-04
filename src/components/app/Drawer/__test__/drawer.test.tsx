import React from 'react';
import * as redux from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Drawer, { DrawerStyled } from '../Drawer';
import { AppActionTypes } from '@store/app/types';

Enzyme.configure({ adapter: new Adapter() });

describe('Drawer component', () => {
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
    component = shallow(<Drawer />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render Drawer component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should dispatch drawerToggleAction when clicked toggle', () => {
    // @ts-ignore
    component.find(IconButton).props().onClick();
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: AppActionTypes.DRAWER_TOGGLE,
    });
  });
});

describe('DrawerStyled component', () => {
  it('Should render DrawerStyled component', () => {
    expect(shallow(<DrawerStyled />)).toMatchSnapshot();
  });
});
