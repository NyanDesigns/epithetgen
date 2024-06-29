// components/steps/Step2EpithetOrCore.js
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { nouns } from "nouns";
import { useEffect, useState } from "react";
import StepButtons from "../steps/card/StepButtons";

const Step2EpithetOrCore = ({
  character,
  setCharacter,
  handleNextStep,
  handlePrevStep,
}) => {
  const [randomWords, setRandomWords] = useState(
    character.epithetOptions || []
  );
  const [rerollsRemaining, setRerollsRemaining] = useState(
    character.rerollsRemaining2 ?? 3
  );
  const [wordDefinitions, setWordDefinitions] = useState({});

  const generateWords = () => {
    const words = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * nouns.length);
      words.push(nouns[randomIndex]);
    }
    return words;
  };

  // Function to fetch the definition of a word
  const getMeaning = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
      );
      const data = await response.json();
      if (
        data &&
        data[0] &&
        data[0].meanings &&
        data[0].meanings[0].definitions[0].definition
      ) {
        setWordDefinitions((prev) => ({
          ...prev,
          [word]: data[0].meanings[0].definitions[0].definition,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (randomWords.length === 0) {
      const newWords = generateWords();
      setRandomWords(newWords);
      setCharacter((prev) => ({ ...prev, epithetOptions: newWords }));
    }
  }, []);

  const handleReroll = () => {
    if (rerollsRemaining > 0) {
      const newWords = generateWords();
      setRandomWords(newWords);
      setCharacter((prev) => ({
        ...prev,
        epithetOptions: newWords,
        epithetOrCoreWord: "",
      }));
      setRerollsRemaining((prev) => prev - 1);
    }
  };

  const handleWordSelection = (word) => {
    setCharacter((prev) => ({
      ...prev,
      epithetOrCoreWord: word,
      rerollsRemaining2: rerollsRemaining,
    }));
    getMeaning(word); // Fetch the definition of the selected word
  };

  // Check if the step is complete (a word has been selected)
  const isStepComplete = character.epithetOrCoreWord !== "";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Step 2: {character.type === "epithet" ? "Epithet" : "Core"}
        </CardTitle>
        <CardDescription>
          Select one Word to generate your{" "}
          {character.type === "epithet" ? "Epithet" : "Core"} from the options
          below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between gap-2 mb-4">
          {randomWords.map((word, index) => (
            <Button
              key={index}
              onClick={() => handleWordSelection(word)}
              variant={
                character.epithetOrCoreWord === word
                  ? "outlinevioletbg"
                  : "outlineviolet"
              }
              className="flex flex-col h-fit"
            >
              {word}
              {character.epithetOrCoreWord === word &&
                wordDefinitions[word] && (
                  <div className="mt-1 text-[12px] italic leading-5 font-normal text-gray-600 text-foreground text-wrap">
                    {wordDefinitions[word]}
                  </div>
                )}
            </Button>
          ))}
        </div>
        <StepButtons
          step={2}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          onReroll={handleReroll}
          rerollsRemaining={rerollsRemaining}
          isStepComplete={isStepComplete}
        />
      </CardContent>
    </Card>
  );
};

export default Step2EpithetOrCore;


// Working