import * as React from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type TTextFieldPropsWithoutName = Omit<TextFieldProps, 'name'>;
interface ITextFieldProps extends TTextFieldPropsWithoutName {
  name: string;
}

const TextFieldWrapper = ({ name, ...otherProps }: ITextFieldProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
