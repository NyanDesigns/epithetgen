// components/steps/Step1BasicInfo.js
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adjectives,
  animals,
  colors,
  names,
  NumberDictionary,
  uniqueNamesGenerator
} from "unique-names-generator";
import StepButtons from "../steps/card/StepButtons";

const Step1BasicInfo = ({
  character,
  setCharacter,
  handleNextStep
}) => {
  const isStepComplete = character.name && character.type;

  const handleGenerate = () => {
    const numberDictionary = NumberDictionary.generate({ min: 1, max: 99 });
    const config = {
      dictionaries: [
        names,
        [names, colors, animals, adjectives, numberDictionary][
          Math.floor(Math.random() * 5)
        ],
      ],
      separator: " ",
      length: 2,
      style: "capital",
    };

    const generatedName = uniqueNamesGenerator(config);
    setCharacter((prev) => ({ ...prev, name: generatedName }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Step 1: Basic Information</CardTitle>
        <CardDescription>
          Enter your character&apos;s name and choose their type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="name">Enter Character Name</Label>
        <Input
          id="name"
          value={character.name}
          onChange={(e) =>
            setCharacter((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mb-4 font-bold text-rose-700"
        />
        <Label>Enter Character Type</Label>
        <div className="flex justify-between gap-4 mb-4">
          <Button
            onClick={() =>
              setCharacter((prev) => ({ ...prev, type: "epithet" }))
            }
            variant={
              character.type === "epithet" ? "outlinevioletbg" : "outlineviolet"
            }
          >
            Epithet User
          </Button>
          <Button
            onClick={() =>
              setCharacter((prev) => ({ ...prev, type: "mundie" }))
            }
            variant={
              character.type === "mundie" ? "outlinevioletbg" : "outlineviolet"
            }
          >
            Mundie
          </Button>
        </div>
        <StepButtons
          step={1}
          onNext={handleNextStep}
          onGenerate={handleGenerate}
          isStepComplete={isStepComplete}
        />
      </CardContent>
    </Card>
  );
};

export default Step1BasicInfo;
