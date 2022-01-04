import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import { Select } from '@mui/material';
import RecordSelect from '../RecordSelect';

Enzyme.configure({ adapter: new Adapter() });

const setterFunc = jest.fn();

describe('RecordSelect component', () => {
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

  it('Should render RecordSelect component', () => {
    component = shallow(
      <RecordSelect
        name="name"
        params={[{ value: 'value', name: 'name' }]}
        setter={setterFunc}
        value="value"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('Should be called "useState"', () => {
    mockUseEffect();
    component = shallow(
      <RecordSelect
        name="name"
        params={[{ value: 'value', name: 'name' }]}
        setter={setterFunc}
        value="value"
      />
    );
    expect(setState).toHaveBeenCalledWith('value');
  });

  it('handleChange should call setState and setter func', () => {
    component = shallow(
      <RecordSelect
        name="name"
        params={[{ value: 'value', name: 'name' }]}
        setter={setterFunc}
        value="value"
      />
    );
    // @ts-ignore
    component.find(Select).props().onChange();
    expect(setState).toHaveBeenCalled();
    expect(setterFunc).toHaveBeenCalled();
  });
});
