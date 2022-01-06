export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : '';
}

export function getEnumValueByEnumKey(myEnum: any, enumKey: number | string): string {
  return myEnum[enumKey];
}

export function getHumanDate(number: number | null) {
  if (number !== null) {
    const dateObj = new Date(number);

    let day: number | string = dateObj.getDate();
    if (day < 10) day = '0' + day;

    let month: number | string = dateObj.getMonth() + 1;
    if (month < 10) month = '0' + month;

    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  } else return null;
}
