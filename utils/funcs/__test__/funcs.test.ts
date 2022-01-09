import { getEnumKeyByEnumValue, getEnumValueByEnumKey, getHumanDate } from '..';

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

  it('Function getHumanDate testing', () => {
    expect(getHumanDate(null)).toBe(null);
    expect(getHumanDate(1643662800000)).toBe('01.02.2022');
    expect(getHumanDate(1668027600000)).toBe('10.11.2022');
  });
});
