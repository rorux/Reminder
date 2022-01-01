import * as React from 'react';
import * as Redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Confirm from '../Confirm';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () =>
  shallow(<Confirm open={false} setOpen={jest.fn()} handler={jest.fn()} id={'1s3'} />);

describe('Confirm component', () => {
  let component: Enzyme.ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });

  it('Snapshot of Confirm component', () => {
    expect(component).toMatchSnapshot();
  });
});
