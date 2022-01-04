import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import RecordCreate from '../RecordCreate';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('RecordCreate component', () => {
  let component: Enzyme.ShallowWrapper;
  let useEffect: any;
  let setState: any;
  let useStateSpy;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    setState = jest.fn();
    useStateSpy = jest.spyOn(React, 'useState');
    // @ts-ignore
    useStateSpy.mockImplementation((init) => [init, setState]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should call "useEffect"', () => {
    mockUseEffect();
    component = shallow(<RecordCreate />);
    expect(setState).toHaveBeenCalledWith('');
  });

  it('Should call weeklyComputedDays when click Submit', () => {
    component = shallow(<RecordCreate />);
    const inputTitle = component.find(`[data-test='input-title']`);
    // @ts-ignore
    inputTitle.props().onChange();
    expect(setState).toHaveBeenCalled();
  });
});
