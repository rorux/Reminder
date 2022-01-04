import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import RecordsAccordion from '../RecordsAccordion';
import RecordItem from '@components/RecordItem';

Enzyme.configure({ adapter: new Adapter() });

const recordListRender = [
  {
    id: '1',
    period: 'Ежемесячно',
    title: 'title of monthly remind',
    comment:
      '8-го числа. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ПОСЛЕ наступления срока.',
  },
];

describe('RecordsAccordion component', () => {
  let component: Enzyme.ShallowWrapper;
  let setState: any;
  let useStateSpy;
  beforeEach(() => {
    setState = jest.fn();
    useStateSpy = jest.spyOn(React, 'useState');
    // @ts-ignore
    useStateSpy.mockImplementation((init) => [init, setState]);
    component = shallow(
      <RecordsAccordion recordListRender={recordListRender} handleDelete={jest.fn()} />
    );
  });

  it('Should render RecordsAccordion component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should be called "useState"', () => {
    const func = component.find(RecordItem).props().handleChange('123');
    func(null, false);
    expect(setState).toHaveBeenCalledWith(false);

    func(null, true);
    expect(setState).toHaveBeenCalledWith('123');
  });
});
