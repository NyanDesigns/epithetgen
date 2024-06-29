export function TitleBlock() {
  return (
    <div className="flex flex-col items-center">
      {/* logo */}
      <div className="relative w-20 h-20 mb-4 logo" />
      {/* heading */}
      <h1 className="text-2xl italic text-center text-slate-300 sm:text-3xl sm:leading-tight">
        Anime Campaign
        <br />
        <span className="text-4xl not-italic font-bold text-transparent bg-gradient-to-r sm:text-5xl from-blue-400 via-rose-300 to-violet-400 bg-clip-text">
          Character Creator
        </span>
      </h1>
    </div>
  );
}
