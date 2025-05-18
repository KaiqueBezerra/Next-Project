import { Dispatch, SetStateAction } from "react";

export const projectRegex = {
  projectNameRegex(value: string, set: Dispatch<SetStateAction<string>>) {
    const regex = /^.{0,50}$/;
    const result = regex.test(value);

    if (result) {
      set(value);
    }

    return value;
  },

  projectDescriptionRegex(
    value: string,
    set: Dispatch<SetStateAction<string>>
  ) {
    const regex = /^.{0,1000}$/;
    const result = regex.test(value);

    if (result) {
      set(value);
    }

    return value;
  },

  projectPhoneNumberRegex(
    value: string,
    set: Dispatch<SetStateAction<string>>
  ) {
    const regex = /^\d*$/;
    const result = regex.test(value);

    if (result) {
      set(value);
    }

    return value;
  },
};
