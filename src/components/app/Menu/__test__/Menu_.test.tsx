import React from 'react';
import { Link } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Menu from '../Menu';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '/edit',
  })),
}));

it('Should render Link components', () => {
  const component = shallow(<Menu />);
  expect(component.find(Link)).toHaveLength(3);
});
