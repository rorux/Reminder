import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Login from '../Login';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => shallow(<Login />);
describe('Login component', () => {
  let component: Enzyme.ShallowWrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let asyncFunc: jest.Mock;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({
      error: null,
    });
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    asyncFunc = jest.fn();
    mockDispatch = jest.fn(() => asyncFunc);
    spyOnUseDispatch.mockReturnValue(mockDispatch);
    component = setUp();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render Login component', () => {
    expect(component).toMatchSnapshot();
  });
});
