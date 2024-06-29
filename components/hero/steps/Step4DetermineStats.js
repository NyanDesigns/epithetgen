// components/steps/Step4DetermineStats.js
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import StepButtons from "../steps/card/StepButtons";

const Step4DetermineStats = ({
  character,
  setCharacter,
  handlePrevStep,
  handleNextStep,
}) => {
  const [rerollsRemaining, setRerollsRemaining] = useState(
    character.rerollsRemaining4 ?? 3
  );
  const [staminaRolling, setStaminaRolling] = useState(false);
  const [proficiencyRolling, setProficiencyRolling] = useState(false);
  const [staminaResult, setStaminaResult] = useState(character.stamina || null);
  const [proficiencyResult, setProficiencyResult] = useState(
    character.proficiency || null
  );
  const [hasInitialRoll, setHasInitialRoll] = useState(
    character.hasInitialStatsRoll || false
  );

  useEffect(() => {
    if (!hasInitialRoll) {
      handleInitialRoll();
    }
  }, []);

  const handleInitialRoll = () => {
    setStaminaRolling(true);
    setProficiencyRolling(true);

    rollDice(
      setStaminaResult,
      setStaminaRolling,
      (result) => result + getBuildStaminaBonus(character.build)
    );
    rollDice(setProficiencyResult, setProficiencyRolling);

    setHasInitialRoll(true);
  };

  const handleReroll = () => {
    if (rerollsRemaining > 0) {
      setStaminaRolling(true);
      setProficiencyRolling(true);
      setRerollsRemaining((prev) => prev - 1);

      rollDice(
        setStaminaResult,
        setStaminaRolling,
        (result) => result + getBuildStaminaBonus(character.build)
      );
      rollDice(setProficiencyResult, setProficiencyRolling);
    }
  };

  const rollDice = (setResult, setRolling, modifier = (x) => x) => {
    let intervalId;
    const rollDuration = 1000;
    const intervalDuration = 50;

    const startRolling = () => {
      intervalId = setInterval(() => {
        setResult(modifier(Math.floor(Math.random() * 20) + 1));
      }, intervalDuration);
    };

    const stopRolling = () => {
      clearInterval(intervalId);
      const finalResult = modifier(Math.floor(Math.random() * 20) + 1);
      setResult(finalResult);
      setRolling(false);
      updateCharacterStats(finalResult, setResult === setStaminaResult);
    };

    startRolling();
    setTimeout(stopRolling, rollDuration);
  };

  const updateCharacterStats = (newValue, isStamina) => {
    setCharacter((prev) => {
      const updatedStats = isStamina
        ? {
            stamina: newValue,
            proficiency: prev.proficiency || proficiencyResult,
          }
        : { stamina: prev.stamina || staminaResult, proficiency: newValue };

      return {
        ...prev,
        ...updatedStats,
        statRollHistory: [
          ...(prev.statRollHistory || []),
          {
            stamina: updatedStats.stamina,
            proficiency: updatedStats.proficiency,
          },
        ],
        rerollsRemaining4: rerollsRemaining - 1,
        hasInitialStatsRoll: true,
      };
    });
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
        <CardTitle>Step 4: Determine Stats</CardTitle>
        <CardDescription>
          Roll for your character's Stamina and Proficiency stats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Stamina</h3>
            <div
              className={`text-4xl font-bold mb-2 ${
                staminaRolling ? "animate-bounce" : ""
              }`}
            >
              {staminaResult === null ? "0" : staminaResult}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Proficiency</h3>
            <div
              className={`text-4xl font-bold mb-2 ${
                proficiencyRolling ? "animate-bounce" : ""
              }`}
            >
              {proficiencyResult === null ? "0" : proficiencyResult}
            </div>
          </div>
        </div>
        <StepButtons
          step={4}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          onReroll={handleReroll}
          rerollsRemaining={rerollsRemaining}
          isStepComplete={staminaResult !== null && proficiencyResult !== null}
        />
      </CardContent>
    </Card>
  );
};


export default Step4DetermineStats;

//working