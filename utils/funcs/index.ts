export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}

export function getEnumValueByEnumKey(myEnum: any, enumKey: number | string): string {
  return myEnum[enumKey];
}
