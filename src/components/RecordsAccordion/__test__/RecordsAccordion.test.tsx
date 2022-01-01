import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import RecordsAccordion from '../RecordsAccordion';

Enzyme.configure({ adapter: new Adapter() });

it('Should render RecordsAccordion component', () => {
  const recordListRender = [
    {
      id: '1',
      period: 'Ежемесячно',
      title: 'title of monthly remind',
      comment:
        '8-го числа. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ПОСЛЕ наступления срока.',
    },
    {
      id: '2',
      period: 'Ежеквартально',
      title: 'title of quarterly remind',
      comment:
        '8-го числа в январе, апреле, июле, октябре. В случае выпадения на выходной или праздничный день перенос на ближайший рабочий день ДО наступления срока.',
    },
  ];
  const component = shallow(
    <RecordsAccordion recordListRender={recordListRender} handleDelete={jest.fn()} />
  );
  expect(component).toMatchSnapshot();
});
