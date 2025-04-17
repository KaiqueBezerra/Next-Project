import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  model?: string;
};

export function Button({ model, ...props }: ButtonProps) {
  return (
    <button
      className="flex justify-center items-center cursor-pointer rounded-md p-3.5 font-bold
      transition duration-200 border-5 border-double border-zinc-800 bg-amber-500 hover:bg-amber-800
      disabled:opacity-5 disabled:cursor-wait"
      {...props}
    />
  );
}
