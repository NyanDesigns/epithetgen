'use client'

import { useEffect, useState } from "react";

// Import step components
import Step1BasicInfo from "../components/hero/steps/Step1BasicInfo";
import Step2EpithetOrCore from "../components/hero/steps/Step2EpithetOrCore";
import Step3CharacterBuild from "../components/hero/steps/Step3CharacterBuild";
import Step4DetermineStats from "../components/hero/steps/Step4DetermineStats";
import Step5ClassAndWeapon from "../components/hero/steps/Step5ClassAndWeapon";
import Step6TalentsAndPassive from "../components/hero/steps/Step6TalentsAndPassive";
import Step7Abilities from "../components/hero/steps/Step7Abilities";
import Step8CharacterSheet from "../components/hero/steps/Step8CharacterSheet";

import { TitleBlock } from "../components/hero/TitleBlock";

const CharacterCreator = () => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({
    name: "",
    type: "",
    epithetOrCoreWord: "",
    build: "",
    stamina: 0,
    proficiency: 0,
    movement: 0,
    class: "",
    weapon: { name: "", description: "", damage: 0, range: 0 },
    talents: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
    ],
    passive: { name: "", description: "" },
    abilities: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
    ],
    statRollHistory: [],
    rerollsRemaining2: null,
    rerollsRemaining4: null,
    hasInitialStatsRoll: false,
    statOptions: { stamina: null, proficiency: null },
  });
  const [rollingStats, setRollingStats] = useState(false);

  //log status
  useEffect(() => {
    console.log("Current step:", step);
    console.log("Current character state:", character);
    console.log("Rolling stats:", rollingStats);
  }, [step, character, rollingStats]);

  const handlePrevStep = () => {
    setStep((prevStep) => {
      console.log(`Moving to previous step: ${prevStep - 1}`);
      return prevStep - 1;
    });
  };

  const handleNextStep = () => {
    setStep((prevStep) => {
      console.log(`Moving to next step: ${prevStep + 1}`);
      return prevStep + 1;
    });
    if (step === 3) {
      console.log("Triggering stat rolling");
      setRollingStats(true);
    }
  };

    const handleRestart = () => {
      setStep(1);
      setCharacter({
        name: "",
        type: "",
        epithetOrCoreWord: "",
        build: "",
        stamina: 0,
        proficiency: 0,
        movement: 0,
        class: "",
        weapon: { name: "", description: "", damage: 0, range: 0 },
        talents: [
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
        ],
        passive: { name: "", description: "" },
        abilities: [
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
          { name: "", description: "" },
        ],
        statRollHistory: [],
        rerollsRemaining2: null,
        rerollsRemaining4: null,
        hasInitialStatsRoll: false,
        statOptions: { stamina: null, proficiency: null },
      });
    };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1BasicInfo
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <Step2EpithetOrCore
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <Step4DetermineStats
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 4:
        return (
          <Step3CharacterBuild
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 5:
        return (
          <Step5ClassAndWeapon
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 6:
        return (
          <Step6TalentsAndPassive
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 7:
        return (
          <Step7Abilities
            character={character}
            setCharacter={setCharacter}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 8:
        return (
          <Step8CharacterSheet
            character={character}
            handlePrevStep={handlePrevStep}
            handleRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full min-h-full gap-6 px-4 py-6">
      {/* titleBlock */}
      <TitleBlock step={step} />
      {/* step-cards */}
      <div className="flex flex-col items-center justify-center w-full grow">
        {renderStep()}
      </div>
    </div>
  );
};

export default CharacterCreator;
