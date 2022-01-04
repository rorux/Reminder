import React from 'react';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import { Formik } from 'formik';
import Register from '../Register';
import AuthSnackbar from '@components/AuthSnackbar';

Enzyme.configure({ adapter: new Adapter() });

const setUp = () => shallow(<Register />);
describe('Register component', () => {
  let component: Enzyme.ShallowWrapper;
  let spyOnUseSelector: any;
  let spyOnUseDispatch;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render Register component', () => {
    spyOnUseSelector.mockReturnValue({
      error: null,
    });
    component = setUp();
    expect(component).toMatchSnapshot();
  });

  it('Should dispatch authRegisterAction when submit form', () => {
    spyOnUseSelector.mockReturnValue({
      error: null,
    });
    component = setUp();
    // @ts-ignore
    component.find(Formik).props().onSubmit({ email: 'email', password: 'password' });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should dispatch authClearErrorAction', () => {
    spyOnUseSelector.mockReturnValue({
      error: 'error',
    });
    component = setUp();
    // @ts-ignore
    component.find(AuthSnackbar).props().clearError();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
