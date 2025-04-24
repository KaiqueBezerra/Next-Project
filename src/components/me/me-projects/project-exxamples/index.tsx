export function ProjectExamples() {
  return (
    <>
      <div
        className="flex flex-col w-[320px] h-80 rounded-md p-5 border-10 border-double bg-zinc-700
      border-zinc-900 transition hover:translate-y-[-10] gap-2 sm:size-96 shadow-[0px_0px_10px_0px_black]"
      >
        <div>
          <h1
            className="capitalize overflow-hidden text-ellipsis line-clamp-3 
            text-xl font-serif flex-1 sm:text-2xl text-amber-500"
          >
            Nome do projeto.
          </h1>
          <div className="text-sm italic">
            <p>Publicado: há cerca de 6 horas</p>
          </div>
          <div>
            <p
              className="text-justify overflow-hidden text-ellipsis line-clamp-3 
              text-md sm:text-lg"
            >
              Essa seria a descrição do projeto.
            </p>
            <div>
              <div
                className="overflow-hidden text-ellipsis line-clamp-1 mt-4
              *:bg-amber-500 *:border *:border-zinc-800 *:p-2 *:mr-1 *:sm:p-2.5 
                *:inline-block *:font-bold *:text-black"
              >
                <p>Requisito 1</p>
                <p>Requisito 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end flex-1">
          <p
            className="border border-zinc-800 font-bold text-black 
          bg-amber-500 hover:bg-amber-800 p-2 sm:p-2.5"
          >
            Ver mais
          </p>
        </div>
      </div>

      <div
        className="flex flex-col w-[320px] h-80 rounded-md p-5 border-10 border-double bg-zinc-700
      border-zinc-900 transition hover:translate-y-[-10] gap-2 sm:size-96 shadow-[0px_0px_10px_0px_black]"
      >
        <div>
          <h1
            className="capitalize overflow-hidden text-ellipsis line-clamp-3 
            text-xl font-serif flex-1 sm:text-2xl text-amber-500"
          >
            Nome do projeto 2.
          </h1>
          <div className="text-sm italic">
            <p>Publicado: há cerca de 8 horas</p>
          </div>
          <div>
            <p
              className="text-justify overflow-hidden text-ellipsis line-clamp-3 
              text-md sm:text-lg"
            >
              Essa seria a descrição do projeto 2.
            </p>
            <div>
              <div
                className="overflow-hidden text-ellipsis line-clamp-1 mt-4
              *:bg-amber-500 *:border *:border-zinc-800 *:p-2 *:mr-1 *:sm:p-2.5 
                *:inline-block *:font-bold *:text-black"
              >
                <p>Requisito 1</p>
                <p>Requisito 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end flex-1">
          <p
            className="border border-zinc-800 font-bold text-black 
          bg-amber-500 hover:bg-amber-800 p-2 sm:p-2.5"
          >
            Ver mais
          </p>
        </div>
      </div>
    </>
  );
}
