import React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jsdom-global/register';
import Enzyme, { shallow } from 'enzyme';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Profile from '../Profile';

Enzyme.configure({ adapter: new Adapter() });

const createSelector = (loading: boolean) => ({
  userName: null,
  loading,
  error: false,
});

describe('Profile component', () => {
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
    const component = shallow(<Profile />);
    expect(component).toMatchSnapshot();
  });

  it('Should work "useEffect"', () => {
    useSelector.mockReturnValue(createSelector(false));
    mockUseEffect();
    shallow(<Profile />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Data entry should change state', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Profile />);
    // @ts-ignore
    component.find(TextField).props().onChange();
    expect(setState).toHaveBeenCalled();
  });

  it('Click button should dispatch action', () => {
    useSelector.mockReturnValue(createSelector(false));
    const component = shallow(<Profile />);
    // @ts-ignore
    component.find(Button).props().onClick();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should render CircularProgress when loading', () => {
    useSelector.mockReturnValue(createSelector(true));
    const component = shallow(<Profile />);
    expect(component.find(CircularProgress)).toHaveLength(1);
  });
});
