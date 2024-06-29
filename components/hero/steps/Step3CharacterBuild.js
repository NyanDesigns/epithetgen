// components/steps/Step3CharacterBuild.js
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StepButtons from "../steps/card/StepButtons";

const Step3CharacterBuild = ({
  character,
  setCharacter,
  handleNextStep,
  handlePrevStep,
}) => {
  const handleBuildChange = (value) => {
    let movementBonus = 0;
    let staminaBonus = 0;

    switch (value) {
      case "svelte":
        movementBonus = 6;
        staminaBonus = 10;
        break;
      case "average":
        movementBonus = 5;
        staminaBonus = 15;
        break;
      case "heavyset":
        movementBonus = 4;
        staminaBonus = 20;
        break;
    }

    setCharacter((prev) => ({
      ...prev,
      build: value,
      movement:
        prev.movement -
        (prev.build ? getBuildMovementBonus(prev.build) : 0) +
        movementBonus,
      stamina:
        prev.stamina -
        (prev.build ? getBuildStaminaBonus(prev.build) : 0) +
        staminaBonus,
    }));
  };

  const getBuildMovementBonus = (build) => {
    switch (build) {
      case "svelte":
        return 6;
      case "average":
        return 5;
      case "heavyset":
        return 4;
      default:
        return 0;
    }
  };

  const getBuildStaminaBonus = (build) => {
    switch (build) {
      case "svelte":
        return 10;
      case "average":
        return 15;
      case "heavyset":
        return 20;
      default:
        return 0;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Step 3: Character Build</CardTitle>
        <CardDescription>
          Choose your character&apos;s build to determine their movement and
          stamina bonus.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Choose your character&apos;s build</Label>
        <RadioGroup
          value={character.build}
          onValueChange={handleBuildChange}
          className="flex flex-row justify-between mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="svelte" id="svelte" />
            <Label htmlFor="svelte">Svelte</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="average" id="average" />
            <Label htmlFor="average">Average</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="heavyset" id="heavyset" />
            <Label htmlFor="heavyset">Heavyset</Label>
          </div>
        </RadioGroup>
        <div className="flex justify-around mb-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Stamina</h3>
            <div className={`text-4xl text-center font-bold mb-2`}>
              {character.stamina}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Movement</h3>
            <div className={`text-4xl text-center font-bold mb-2`}>
              {character.movement}
            </div>
          </div>
        </div>
        <StepButtons
          step={3}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          isStepComplete={character.build !== ""}
        />
      </CardContent>
    </Card>
  );
};

export default Step3CharacterBuild;
