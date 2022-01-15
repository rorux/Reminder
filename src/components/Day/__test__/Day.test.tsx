import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Day, { Item } from '../Day';

Enzyme.configure({ adapter: new Adapter() });

const record = {
  id: '1',
  title: 'title of monthly remind',
  period: 'monthly',
  monthday: '8',
  holidays: 'afterHoliday',
  days: [1642366800000, 1644872400000],
};

const setUp = () => shallow(<Day records={[record]} number={123} />);
describe('Day component', () => {
  let component: Enzyme.ShallowWrapper;
  let spyOnUseContext: any;
  let spyOnUseDispatch;
  let mockDispatch: jest.Mock;

  const mockUseContext = () => {
    spyOnUseContext.mockImplementationOnce(() => ({ todayParse: 123 }));
  };

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    spyOnUseContext = jest.spyOn(React, 'useContext');
  });

  it('Should render Day component', () => {
    component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('Item click should dispatch modalOpenAction', () => {
    component = setUp();
    const item = component.find(`[data-test='item']`);
    // @ts-ignore
    item.props().onClick();
    expect(mockDispatch).toHaveBeenCalled();

    // @ts-ignore
    expect(item.props().sx.backgroundColor).toBe('#e0e0e0');
  });

  it('Item changes backgroundColor when Context has todayParse === number', () => {
    mockUseContext();
    component = setUp();
    const item = component.find(`[data-test='item']`);

    // @ts-ignore
    expect(item.props().sx.backgroundColor).toBe('#a5d6a7');
    // @ts-ignore
    expect(item.props().sx.cursor).toBe('pointer');
  });

  it('Item changes color when holiday', () => {
    mockUseContext();
    const component = shallow(
      <Day records={[record]} number={Date.parse(String(new Date(2022, 0, 1)))} />
    );
    const item = component.find(`[data-test='item']`);

    // @ts-ignore
    expect(item.props().sx.color).toBe('red');
  });

  it('useDispatch have not be called when records empty', () => {
    component = shallow(<Day records={[]} number={123} />);
    const item = component.find(`[data-test='item']`);
    expect(item.props().children).toBe(1);
    // @ts-ignore
    expect(item.props().onClick).toBeUndefined();
  });

  it('Date is empty when prop number is null', () => {
    component = shallow(<Day records={[]} number={null} />);
    const item = component.find(`[data-test='item']`);
    expect(item.props().children).toBe('');
  });
});

describe('Item component', () => {
  it('Should render Item component', () => {
    const component = shallow(<Item />);
    expect(component).toMatchSnapshot();
  });
});
