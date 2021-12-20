import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Register from '../Register';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    error: null,
  })),
  useDispatch: jest.fn(() => jest.fn((value) => value)),
}));

const setUp = () => shallow(<Register />);
describe('Register component', () => {
  let component: Enzyme.ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render Register component', () => {
    expect(component).toMatchSnapshot();
  });
});
