import Image from "next/image";
export function TitleBlock() {
  return (
    <div className="flex flex-col items-center">
      {/* logo */}
      <Image
        className="relative mb-4"
        src="https://cdn.discordapp.com/attachments/764894209286209637/1256532326834372669/Logo_21.png?ex=66811c6b&is=667fcaeb&hm=61dca38cbd434bdacfe76704353fde460233a5ce3d51631703c3b50b8fa7f3cf&"
        alt="logo"
        unoptimized
        width={200}
        height={100}
        style={{ width: "auto", height: "auto" }} //Fix CSS error
        priority
      />
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
