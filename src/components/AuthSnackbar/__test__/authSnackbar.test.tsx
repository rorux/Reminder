import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import Snackbar from '@mui/material/Snackbar';
import AuthSnackbar, { Alert } from '../AuthSnackbar';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    error: null,
  })),
  useDispatch: jest.fn(() => jest.fn((value) => value)),
}));

describe('AuthSnackbar component', () => {
  it('Should render AuthSnackbar component with message prop', () => {
    const component = shallow(<AuthSnackbar message="Check message prop" />);
    expect(component.find(`[data-test='snackbar-alert']`).text()).toBe('Check message prop');
  });

  it('Should change state and props when closing', () => {
    const component = shallow(<AuthSnackbar message="Check message prop" />);
    expect(component.find(Snackbar).props().open).toBeTruthy();
    // @ts-ignore
    component.find(Alert).props().onClose();
    expect(component.find(Snackbar).props().open).toBeFalsy();
  });
});
