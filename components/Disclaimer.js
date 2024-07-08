import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-3xl max-h-full sm:max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Before We Begin...</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4 prose-sm prose max-w-none">
              <h1 className="text-2xl font-bold">
                Hey there, fellow creator! 👋
              </h1>

              <p>
                This nifty tool is a <em>fan-made project</em> inspired by
                &quot;Epithet Erased&quot;, Anime Campaign system. We&apos;re
                here to help you bring your characters to life!
              </p>

              <blockquote className="pl-4 italic border-l-4 border-gray-300">
                <strong>FYI:</strong> We&apos;re still in prototype mode, so{" "}
                <strong>
                  expect some generalizations and maybe a few quirks along the
                  way
                </strong>
                . Detailed stats and perfect accuracy? We&apos;re working on it!
              </blockquote>

              <ol className="list-decimal list-inside">
                <li>
                  <strong>Original credit:</strong> Inspired by{" "}
                  <a
                    href="https://x.com/BrendanBlaber"
                    className="text-blue-500 hover:underline"
                  >
                    jelloapocalypse
                  </a>
                  &apos;s &quot;Epithet Erased&quot;, please support the{" "}
                  <a
                    href="https://www.patreon.com/jelloapocalypse"
                    className="text-blue-500 hover:underline"
                  >
                    original series
                  </a>
                  .
                </li>
                <li>
                  <strong>Our foundation:</strong> Based on the{" "}
                  <a
                    href="https://docs.google.com/document/d/1FDjPzvwzjypF0LUFjHpHELCMycIL7NA2g5BFPlEdYTo/edit?usp=sharing"
                    className="text-blue-500 hover:underline"
                  >
                    Anime Campaign system v.1.2
                  </a>
                  . Check it out for the full scoop!
                </li>
                <li>
                  <strong>Last updated:</strong> July/8/24
                </li>
              </ol>

              <p>
                <strong>This Webapp credit:</strong> That would be me,{" "}
                <strong>Nyan Designs</strong>! ✨ If you&apos;re enjoying this
                tool, why not give me a follow? You can find me at{" "}
                <a
                  href="https://twitter.com/nyandesigns0"
                  className="text-blue-500 hover:underline"
                >
                  @nyandesigns0
                </a>{" "}
                for more creative shenanigans!
              </p>

              <p>Now, let&apos;s get creative and have some fun! 🎉</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction className="w-full">
            Let&apos;s Create!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
