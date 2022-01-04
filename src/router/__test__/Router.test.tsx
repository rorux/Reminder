import React from 'react';
import 'jsdom-global/register';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Route, MemoryRouter, BrowserRouter } from 'react-router-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import MyRouter from '../Router';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import MainRoute from '../MainRoute';
import { ROUTES } from '../types';
import Dashboard from '@components/containers/Dashboard';
import { rootStateForTesting } from '@store/types';
import PageLayout from '@screens/PageLayout';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => rootStateForTesting),
  useDispatch: jest.fn(),
}));

const setUp = (route: string, authed: boolean) =>
  mount(
    <MemoryRouter initialEntries={[route]}>
      <MyRouter authed={authed} />
    </MemoryRouter>
  );

describe('MainRoute', () => {
  it('Should render Calendar with auth', () => {
    const component = shallow(<MainRoute authed={true} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).props.to.pathname).toBe(
      ROUTES.CALENDAR
    );
  });

  it('Should render Login without auth', () => {
    const component = shallow(<MainRoute authed={false} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).props.to.pathname).toBe(ROUTES.LOGIN);
  });
});

describe('PrivateRoute', () => {
  it('Should render transmitted component with auth', () => {
    const component = shallow(<PrivateRoute authed={true} component={Dashboard} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).type).toBe(Dashboard);
  });
  it('Should render with auth and without transmitted component', () => {
    const component = shallow(<PrivateRoute authed={true} />);
    component.find(Route).props().render();
  });
  it('Should render Login without auth', () => {
    const component = shallow(<PrivateRoute authed={false} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).props.to.pathname).toBe(ROUTES.LOGIN);
  });
});

describe('PublicRoute', () => {
  it('Should render transmitted component without auth', () => {
    const component = shallow(<PublicRoute authed={false} component={Dashboard} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).type).toBe(Dashboard);
  });
  it('Should render without auth and without transmitted component', () => {
    const component = shallow(<PublicRoute authed={false} />);
    component.find(Route).props().render();
  });
  it('Should render Login without auth', () => {
    const component = shallow(<PublicRoute authed={true} />);
    const routeProps = { location: 'string' };
    expect(component.find(Route).props().render(routeProps).props.to.pathname).toBe(
      ROUTES.CALENDAR
    );
  });
});

describe('Router', () => {
  it('Should rendered with authed true', () => {
    const component = shallow(<MyRouter authed={true} />);
    expect(component).toMatchSnapshot();
  });

  it('Should rendered with authed false', () => {
    const component = shallow(<MyRouter authed={false} />);
    expect(component).toMatchSnapshot();
  });
});
