import React from 'react';

export type TConfirmProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  id: string;
};
