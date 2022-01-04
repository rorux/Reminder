import React from 'react';
import { Redirect } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import RecordItem from '../RecordItem';
import Confirm from '@components/Confirm';

Enzyme.configure({ adapter: new Adapter() });

const record = {
  period: 'period',
  title: 'title',
  id: 'id',
  comment: 'comment',
};

const setUp = () =>
  shallow(
    <RecordItem record={record} handleChange={jest.fn()} handleDelete={jest.fn()} expanded="123" />
  );
describe('RecordItem component', () => {
  let component: Enzyme.ShallowWrapper;

  beforeEach(() => {
    component = setUp();
  });

  it('Should render RecordItem component', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should open Confirm when clicked delete-button', () => {
    expect(component.find(Confirm).prop('open')).toBeFalsy();
    // @ts-ignore
    component.find(`[data-test='delete-button']`).props().onClick();
    expect(component.find(Confirm).prop('open')).toBeTruthy();
  });

  it('Should redirect when clicked edit-button', () => {
    // @ts-ignore
    component.find(`[data-test='edit-button']`).props().onClick();
    expect(component.find(Redirect)).toHaveLength(1);
  });
});
