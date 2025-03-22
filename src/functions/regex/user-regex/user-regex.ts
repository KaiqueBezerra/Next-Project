export function userNameRegex(value: string) {
  const regex = /^[A-Za-z\s]+$/;
  const result = regex.test(value);

  return result;
}
