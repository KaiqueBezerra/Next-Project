import { ComponentProps } from "react";

type TextAreaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col flex-1">
      <label className="block text-lg leading-none pb-2" htmlFor={props.name}>
        {label}
      </label>
      <textarea
        name="description"
        id={props.name}
        rows={3}
        className="border border-zinc-700 text-lg p-4 rounded-md transition duration-200 size-full bg-zinc-800
        focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl resize-none flex-1"
        {...props}
      />
    </div>
  );
}
