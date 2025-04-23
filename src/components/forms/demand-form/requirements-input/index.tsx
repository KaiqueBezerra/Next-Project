import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface InputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  requirements: string[];
  handleAddRequirement: () => void;
  handleRemoveRequirement: (index: number) => void;
}

export function Requirements({
  inputValue,
  setInputValue,
  requirements,
  handleAddRequirement,
  handleRemoveRequirement,
}: InputProps) {
  return (
    <div>
      <label htmlFor="requirements" className="block text-lg leading-none pb-2">
        Requisitos
      </label>

      <div className="grid gap-3">
        <div className="flex relative h-16">
          <input
            type="text"
            id="requirements"
            className="border border-zinc-700 block text-lg p-4 transition duration-200
          w-full bg-zinc-800 focus:outline-none focus:border-amber-800 focus:shadow-2xl hover:outline-none hover:shadow-2xl"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Plus
            className="border border-zinc-700 bg-zinc-800
          cursor-pointer h-16 w-16 p-3 hover:border-amber-800 hover:shadow-2xl"
            onClick={handleAddRequirement}
          />
        </div>

        <div className="flex flex-wrap gap-2.5 bg-zinc-800 p-5 rounded-md">
          {requirements.length === 0 ? (
            <p>Nenhum requisito adicionado</p>
          ) : (
            requirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-amber-500 border border-zinc-800
                  font-bold text-black relative pr-6 px-3 py-3"
              >
                <p>{requirement}</p>
                <X
                  className="absolute top-[1px] right-[1px]
                    cursor-pointer hover:text-zinc-900 text-white"
                  onClick={() => handleRemoveRequirement(index)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
