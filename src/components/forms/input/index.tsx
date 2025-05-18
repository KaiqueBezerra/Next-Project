import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="text-white">
      <label className="block leading-none pb-2" htmlFor={props.name}>
        {label}
      </label>
      <input
        type="text"
        id={props.name}
        {...props}
        className="border border-zinc-700 block text-lg p-4 transition duration-200 w-full bg-zinc-800
        focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
      />
    </div>
  );
}
