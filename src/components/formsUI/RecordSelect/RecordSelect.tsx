import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TSelectProps } from './types';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 170,
    },
  },
};

const RecordSelect: React.FC<TSelectProps> = ({ name, params, setter, value }) => {
  const [selectValue, setSelectValue] = React.useState('');

  useEffect(() => {
    if (value) setSelectValue(value);
  }, [value]);

  const handleChange = (event?: SelectChangeEvent) => {
    const value = event?.target.value as string;
    setSelectValue(value);
    setter(value);
  };

  return (
    <Box>
      <FormControl fullWidth required>
        <InputLabel id="select-label">{name}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectValue}
          label={name}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {params.map((item) => {
            return (
              <MenuItem value={item.value} key={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RecordSelect;
