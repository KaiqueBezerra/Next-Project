export const userRegex = {
  userNameRegex(value: string) {
    const regex = /^[A-Za-z\s]+$/;
    const result = regex.test(value);

    return result;
  },

  Password(value: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const result = regex.test(value);

    return result;
  },
};
