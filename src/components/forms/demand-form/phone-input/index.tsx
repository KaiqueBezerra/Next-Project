"use client";

import { ComponentProps, useState } from "react";

import { Info } from "lucide-react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export function PhoneInput({ label, ...props }: InputProps) {
  const [info, setInfo] = useState(false);

  return (
    <div>
      <label htmlFor={props.name} className="block leading-none pb-2">
        {label}
      </label>

      <div className="flex relative h-16 w-full">
        <input
          type="tel"
          id={props.name}
          className="border border-zinc-700 block text-lg p-4 transition duration-200 w-full 
        bg-zinc-800 focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
          {...props}
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
