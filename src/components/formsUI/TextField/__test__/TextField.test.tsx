import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount } from 'enzyme';
import 'jsdom-global/register';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import TextFieldWrapper from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('TextField component', () => {
  it('Should render component with prop name', () => {
    const component = mount(
      <Formik
        initialValues={{
          param: '',
        }}
        onSubmit={jest.fn()}
      >
        <Form>
          <TextFieldWrapper name="check" />
        </Form>
      </Formik>
    );
    const muiTextField = component.find(TextField);
    expect(muiTextField).toHaveLength(1);
    expect(muiTextField.prop('name')).toEqual('check');
  });
});
