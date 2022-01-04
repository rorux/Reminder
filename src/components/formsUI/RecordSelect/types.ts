export type TSelectParams = {
  value: string | number;
  name: string | number;
};

export type TSelectProps = {
  name: string;
  params: Array<TSelectParams>;
  setter: any;
  value?: any;
};
