import Image from "next/image";

export function TitleBlock({ step }) {
  if (step !== 1 && step !== 8) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {step === 1 && (
        <>
          {/* logo */}
          <Image
            className="relative my-4 max-w-[300px] sm:max-w-[400px]"
            src="https://cdn.discordapp.com/attachments/764894209286209637/1256630169628708977/Logo_2.png?ex=6681778b&is=6680260b&hm=b996c32e4148e250255bff550f2b359157810beabe32f15cce52d6d564ec0073&"
            alt="logo"
            unoptimized
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
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
        </>
      )}
      {step === 8 && (
        <h1 className="text-4xl not-italic font-bold text-transparent bg-gradient-to-r sm:text-5xl from-blue-400 via-rose-300 to-violet-400 bg-clip-text">
          Character Sheet
        </h1>
      )}
    </div>
  );
}
