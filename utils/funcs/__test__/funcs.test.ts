import { getEnumKeyByEnumValue, getEnumValueByEnumKey } from '..';

enum testEnum {
  FIRST = 'first element',
  SECOND = 'second element',
  THIRD = 'third element',
}

enum testEnum_ {}

describe('utils/func testing', () => {
  it('Function getEnumKeyByEnumValue testing', () => {
    expect(getEnumKeyByEnumValue(testEnum, 'second element')).toBe('SECOND');
  });

  it('Function getEnumKeyByEnumValue if Enum is empty', () => {
    expect(getEnumKeyByEnumValue(testEnum_, 'second element')).toBe('');
  });

  it('Function getEnumValueByEnumKey testing', () => {
    expect(getEnumValueByEnumKey(testEnum, 'SECOND')).toBe('second element');
  });
});
