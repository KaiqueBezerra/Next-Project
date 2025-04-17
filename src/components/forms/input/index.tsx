import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-4 text-white">
      <label className="block text-lg leading-none pb-2" htmlFor={props.name}>
        {label}
      </label>
      <input
        type="text"
        id={props.name}
        {...props}
        className="border-2 border-amber-500 block text-lg p-4 rounded-md  transition duration-200 w-full bg-zinc-800
        focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:border-amber-800 hover:shadow-2xl"
      />
    </div>
  );
}
