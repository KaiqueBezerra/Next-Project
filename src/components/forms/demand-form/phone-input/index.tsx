"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Info } from "lucide-react";

import { projectPhoneNumberRegex } from "@/functions/regex/project-regex/project-regex";

export function PhoneInput({
  phoneNumber,
  setPhoneNumber,
}: {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}) {
  const [info, setInfo] = useState(false);

  return (
    <div>
      <label htmlFor="phoneNumber" className="block leading-none pb-2">
        Número para contato
      </label>

      <div className="flex relative h-16 w-full">
        <input
          type="tel"
          id="phoneNumber"
          className="border border-zinc-700 block text-lg p-4 transition duration-200 w-full 
        bg-zinc-800 focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
          value={phoneNumber}
          onChange={(e) =>
            projectPhoneNumberRegex(e.target.value, setPhoneNumber)
          }
        />
        <Info
          className="border border-zinc-700 bg-zinc-800
          flex items-center justify-center cursor-pointer h-16 w-16 p-3 hover:border-amber-800 hover:shadow-2xl"
          onClick={() => setInfo(!info)}
        />
        {info && (
          <div
            className="flex flex-col items-center justify-center p-2 right-0 bottom-[-70px]
            rounded-md absolute z-50 bg-zinc-800 shadow-[0px_0px_10px_0px_black]"
          >
            <p>O número deve conter 11 dígitos.</p>
            <p>Ex: 11234567890</p>
          </div>
        )}
      </div>
    </div>
  );
}
