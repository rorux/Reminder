import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Confirm from '../Confirm';
import Dialog from '@mui/material/Dialog';

Enzyme.configure({ adapter: new Adapter() });

const setOpenMock = jest.fn();
const handlerMock = jest.fn();
const setUp = () =>
  shallow(<Confirm open={true} setOpen={setOpenMock} handler={handlerMock} id={'1s3'} />);

// const mockUseEffect = jest.fn();
describe('Confirm component', () => {
  let component: Enzyme.ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });

  it('Snapshot of Confirm component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Check handleClose method', () => {
    const dialog = component.find(Dialog);
    // @ts-ignore
    dialog.props().onClose();
    expect(setOpenMock).toHaveBeenCalled();
  });

  it('Check agreement', () => {
    // @ts-ignore
    component.find(`[data-test='agree']`).props().onClick();
    expect(setOpenMock).toHaveBeenCalled();
    expect(handlerMock).toHaveBeenCalled();
  });
});

describe('Confirm component check "useEffect"', () => {
  let useEffect: any;
  let component: Enzyme.ShallowWrapper;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    component = shallow(
      <Confirm open={false} setOpen={jest.fn()} handler={jest.fn()} id={'1s3'} />
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should take "open" false from props', () => {
    const dialog = component.find(Dialog);
    expect(dialog.prop('open')).toBeFalsy();
  });
});
