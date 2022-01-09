import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Week from '../Week';

Enzyme.configure({ adapter: new Adapter() });

const recordList = [
  {
    id: '1',
    title: 'title of monthly remind',
    period: 'monthly',
    monthday: '8',
    holidays: 'afterHoliday',
    days: [1642366800000, 1644872400000],
  },
];

const weekArray = [null, null, 1642366800000];

describe('Week component', () => {
  it('Should render Week component', () => {
    const component = shallow(<Week recordList={recordList} weekArray={weekArray} />);
    expect(component).toMatchSnapshot();
  });
});
