import React from 'react';
import 'jsdom-global/register';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import MyRouter from '../Router';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Register from '../../screens/Register';
import Login from '../../screens/Login';
import PageLayout from '../../screens/PageLayout';
import NotFound from '../../screens/NotFound';
import { ROUTES } from '../types';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    error: null,
  })),
  useDispatch: jest.fn(),
}));

const setUp = (route: string, authed: boolean) =>
  mount(
    <MemoryRouter initialEntries={[route]}>
      <MyRouter authed={authed} />
    </MemoryRouter>
  );

describe('React Router', () => {
  describe('Not authorized', () => {
    it('Should render the Login page', () => {
      const wrapper = setUp(ROUTES.LOGIN, false);
      expect(wrapper.find(PublicRoute)).toHaveLength(1);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('Should render the Register page', () => {
      const wrapper = setUp(ROUTES.REGISTER, false);
      expect(wrapper.find(PublicRoute)).toHaveLength(1);
      expect(wrapper.find(Register)).toHaveLength(1);
    });

    it('Should render the Login page when open Calendar', () => {
      const wrapper = setUp(ROUTES.CALENDAR, false);
      expect(wrapper.find(PublicRoute)).toHaveLength(1);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('Should render the Login page when open Dashboard', () => {
      const wrapper = setUp(ROUTES.DASHBOARD, false);
      expect(wrapper.find(PublicRoute)).toHaveLength(1);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('Should render the Login page when open the Main page', () => {
      const wrapper = setUp(ROUTES.MAIN, false);
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('Should render 404 when uncorrect URL', () => {
      const wrapper = setUp('/ddd', false);
      expect(wrapper.find(NotFound)).toHaveLength(1);
    });
  });

  describe('Authorized', () => {
    it('Should render Calendar when open the Login page', () => {
      const wrapper = setUp(ROUTES.LOGIN, true);
      expect(wrapper.find(PrivateRoute)).toHaveLength(1);
      expect(wrapper.find(PageLayout)).toHaveLength(1);
    });

    it('Should render Calendar when open the Register page', () => {
      const wrapper = setUp(ROUTES.REGISTER, true);
      expect(wrapper.find(PrivateRoute)).toHaveLength(1);
      expect(wrapper.find(PageLayout)).toHaveLength(1);
    });

    it('Should render Calendar', () => {
      const wrapper = setUp(ROUTES.CALENDAR, true);
      expect(wrapper.find(PrivateRoute)).toHaveLength(1);
      expect(wrapper.find(PageLayout)).toHaveLength(1);
    });

    it('Should render Dashboard', () => {
      const wrapper = setUp(ROUTES.DASHBOARD, true);
      expect(wrapper.find(PrivateRoute)).toHaveLength(1);
      expect(wrapper.find(PageLayout)).toHaveLength(1);
    });

    it('Should render Calendar when open the Main page', () => {
      const wrapper = setUp(ROUTES.MAIN, true);
      expect(wrapper.find(PageLayout)).toHaveLength(1);
    });

    it('Should render 404 when uncorrect URL', () => {
      const wrapper = setUp('/ddd', true);
      expect(wrapper.find(NotFound)).toHaveLength(1);
    });
  });
});
