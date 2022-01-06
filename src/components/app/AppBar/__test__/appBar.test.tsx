import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import AppBar, { AppBarStyled } from '../AppBar';
import { AppActionTypes } from '@store/app/types';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '/edit',
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

  it('Should render AppBar component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render AppBarStyled component', () => {
    expect(component.find(AppBarStyled)).toHaveLength(1);
  });

  it('Should dispatch drawerToggleAction when clicked toggle', () => {
    // @ts-ignore
    component.find(`[data-test='toggle-drawer']`).props().onClick();
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: AppActionTypes.DRAWER_TOGGLE,
    });
  });

  it('Should dispatch authLogoutAction when clicked logout', () => {
    // @ts-ignore
    component.find(`[data-test='logout']`).props().onClick();
    expect(mockDispatch).toHaveBeenCalled();
  });
});

describe('AppBarStyled component', () => {
  it('Should render AppBarStyled component', () => {
    const component = shallow(<AppBarStyled />);
    expect(component).toMatchSnapshot();
  });
});
