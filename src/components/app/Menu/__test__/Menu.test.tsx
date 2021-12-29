import React from 'react';
import { Link } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Menu from '../Menu';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => shallow(<Menu />);

describe('Menu component', () => {
  let component: Enzyme.ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });
  it('Snapshot of Menu component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render Link components', () => {
    expect(component.find(Link)).toHaveLength(3);
  });
});
