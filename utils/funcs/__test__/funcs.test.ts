import { getEnumKeyByEnumValue, getEnumValueByEnumKey } from '..';

enum testEnum {
  FIRST = 'first element',
  SECOND = 'second element',
  THIRD = 'third element',
}

describe('utils/func testing', () => {
  it('Function getEnumKeyByEnumValue testing', () => {
    expect(getEnumKeyByEnumValue(testEnum, 'second element')).toBe('SECOND');
  });

  it('Function getEnumValueByEnumKey testing', () => {
    expect(getEnumValueByEnumKey(testEnum, 'SECOND')).toBe('second element');
  });
});
