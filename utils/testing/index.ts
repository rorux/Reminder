//import { ShallowWrapper } from 'enzyme';

export const findByTestAtrr = (component: any, attr: string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
