import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  model?: string;
};

export function Button({ model, ...props }: ButtonProps) {
  return (
    <button
      className="flex justify-center items-center cursor-pointer p-3.5 font-bold text-black
      transition duration-200 border border-zinc-700 bg-amber-500 hover:opacity-80
      disabled:opacity-60 disabled:cursor-wait w-full"
      {...props}
    />
  );
}
