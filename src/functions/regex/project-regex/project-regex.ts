import { Dispatch, SetStateAction } from "react";

export function projectNameRegex(
  value: string,
  set: Dispatch<SetStateAction<string>>
) {
  const regex = /^.{0,50}$/;
  const result = regex.test(value);

  if (result) {
    set(value);
  }

  return value;
}

export function projectDescriptionRegex(
  value: string,
  set: Dispatch<SetStateAction<string>>
) {
  const regex = /^.{0,1000}$/;
  const result = regex.test(value);

  if (result) {
    set(value);
  }

  return value;
}

export function projectPhoneNumberRegex(
  value: string,
  set: Dispatch<SetStateAction<string>>
) {
  const regex = /^\d*$/;
  const result = regex.test(value);

  if (result) {
    set(value);
  }

  return value;
}
