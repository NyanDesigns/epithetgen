'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";


const DiceRoll = ({ onRollComplete }) => {
  const [rolling, setRolling] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log("DiceRoll component mounted");
    const rollDuration = 2000;
    const intervalDuration = 100;
    let intervalId;

    const startRolling = () => {
      intervalId = setInterval(() => {
        setResult(Math.floor(Math.random() * 20) + 1);
      }, intervalDuration);
    };

    const stopRolling = () => {
      clearInterval(intervalId);
      const finalResult = Math.floor(Math.random() * 20) + 1;
      console.log("Final dice roll result:", finalResult);
      setResult(finalResult);
      setRolling(false);
      onRollComplete(finalResult);
    };

    startRolling();
    setTimeout(stopRolling, rollDuration);

    return () => {
      console.log("DiceRoll component unmounted");
      clearInterval(intervalId);
    };
  }, [onRollComplete]);

  return (
    <div className="text-center">
      <div
        className={`text-4xl font-bold mb-2 ${rolling ? "animate-bounce" : ""}`}
      >
        {result === null ? "?" : result}
      </div>
      <div>{rolling ? "Rolling..." : "Roll complete!"}</div>
    </div>
  );
};

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
    ],
    passive: { name: "", description: "" },
    abilities: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
    ],
  });
  const [randomWords, setRandomWords] = useState([]);
  const [rollingStats, setRollingStats] = useState(false);

  useEffect(() => {
    const fetchRandomWords = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRandomWords(["energy", "whisper", "bloom"]);
    };
    fetchRandomWords();
  }, []);

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

  const handleStaminaRollComplete = (result) => {
    console.log("Stamina roll complete:", result);
    setCharacter((prev) => {
      const staminaBonus =
        prev.build === "svelte" ? 10 : prev.build === "average" ? 15 : 20;
      const newStamina = result + staminaBonus;
      console.log(
        `New stamina: ${newStamina} (roll: ${result}, bonus: ${staminaBonus})`
      );
      return {
        ...prev,
        stamina: newStamina,
      };
    });
  };

  const handleProficiencyRollComplete = (result) => {
    console.log("Proficiency roll complete:", result);
    setCharacter((prev) => ({ ...prev, proficiency: result }));
    setRollingStats(false);
  };

  useEffect(() => {
    console.log("Current step:", step);
    console.log("Current character state:", character);
    console.log("Rolling stats:", rollingStats);
  }, [step, character, rollingStats]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 1: Basic Information</CardTitle>
              <CardDescription>
                Enter your character's name and choose their type.
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
                className="mb-4"
              />
              <Label>Enter Character Type</Label>
              <div className="flex justify-between mb-4">
                <Button
                  onClick={() =>
                    setCharacter((prev) => ({ ...prev, type: "epithet" }))
                  }
                  variant={character.type === "epithet" ? "default" : "outline"}
                >
                  Epithet User
                </Button>
                <Button
                  onClick={() =>
                    setCharacter((prev) => ({ ...prev, type: "mundie" }))
                  }
                  variant={character.type === "mundie" ? "default" : "outline"}
                >
                  Mundie
                </Button>
              </div>
              <Button
                onClick={handleNextStep}
                disabled={!character.name || !character.type}
              >
                Next
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                Step 2: {character.type === "epithet" ? "Epithet" : "Core"}
              </CardTitle>
              <CardDescription>
                Select one Word to generate your{" "}
                {character.type === "epithet" ? "Epithet" : "Core"} from the
                options below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label>
                Select one Word for your{" "}
                {character.type === "epithet" ? "Epithet" : "Core"}
              </Label>
              <div className="flex justify-between mb-4">
                {randomWords.map((word, index) => (
                  <Button
                    key={index}
                    onClick={() =>
                      setCharacter((prev) => ({
                        ...prev,
                        epithetOrCoreWord: word,
                      }))
                    }
                    variant={
                      character.epithetOrCoreWord === word
                        ? "default"
                        : "outline"
                    }
                  >
                    {word}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!character.epithetOrCoreWord}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 3: Character Build</CardTitle>
              <CardDescription>
                Choose your character's build to determine their movement and
                stamina bonus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label>Choose your character's build</Label>
              <RadioGroup
                value={character.build}
                onValueChange={(value) =>
                  setCharacter((prev) => ({ ...prev, build: value }))
                }
                className="flex flex-col mb-4 space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="svelte" id="svelte" />
                  <Label htmlFor="svelte">
                    Svelte (6 Movement, +10 Stamina)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="average" />
                  <Label htmlFor="average">
                    Average (5 Movement, +15 Stamina)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavyset" id="heavyset" />
                  <Label htmlFor="heavyset">
                    Heavyset (4 Movement, +20 Stamina)
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button onClick={handleNextStep} disabled={!character.build}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 4: Determine Stats</CardTitle>
              <CardDescription>
                Rolling for your character's Stamina and Proficiency stats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rollingStats ? (
                <div className="flex justify-around mb-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Stamina</h3>
                    <DiceRoll onRollComplete={handleStaminaRollComplete} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Proficiency</h3>
                    <DiceRoll onRollComplete={handleProficiencyRollComplete} />
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-center">
                  <p>Stamina: {character.stamina}</p>
                  <p>Proficiency: {character.proficiency}</p>
                </div>
              )}
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button
                  onClick={handleNextStep}
                  disabled={
                    rollingStats ||
                    character.stamina === 0 ||
                    character.proficiency === 0
                  }
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 5: Class and Weapon</CardTitle>
              <CardDescription>
                Choose your character's class and define their weapon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="class">Class</Label>
              <Input
                id="class"
                value={character.class}
                onChange={(e) =>
                  setCharacter((prev) => ({ ...prev, class: e.target.value }))
                }
                className="mb-4"
              />
              <Label htmlFor="weaponName">Weapon Name</Label>
              <Input
                id="weaponName"
                value={character.weapon.name}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    weapon: { ...prev.weapon, name: e.target.value },
                  }))
                }
                className="mb-4"
              />
              <Label htmlFor="weaponDescription">Weapon Description</Label>
              <Textarea
                id="weaponDescription"
                value={character.weapon.description}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    weapon: { ...prev.weapon, description: e.target.value },
                  }))
                }
                className="mb-4"
              />
              <Label htmlFor="weaponDamage">Weapon Damage</Label>
              <Input
                id="weaponDamage"
                type="number"
                value={character.weapon.damage}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    weapon: {
                      ...prev.weapon,
                      damage: parseInt(e.target.value),
                    },
                  }))
                }
                className="mb-4"
              />
              <Label htmlFor="weaponRange">Weapon Range</Label>
              <Input
                id="weaponRange"
                type="number"
                value={character.weapon.range}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    weapon: { ...prev.weapon, range: parseInt(e.target.value) },
                  }))
                }
                className="mb-4"
              />
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!character.class || !character.weapon.name}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 6: Talents and Passive</CardTitle>
              <CardDescription>
                Define your character's talents and passive ability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[0, 1, 2].map((index) => (
                <div key={index} className="mb-4">
                  <Label htmlFor={`talent${index + 1}`}>
                    Talent {index + 1}
                  </Label>
                  <Input
                    id={`talent${index + 1}`}
                    value={character.talents[index].name}
                    onChange={(e) => {
                      const newTalents = [...character.talents];
                      newTalents[index] = {
                        ...newTalents[index],
                        name: e.target.value,
                      };
                      setCharacter((prev) => ({
                        ...prev,
                        talents: newTalents,
                      }));
                    }}
                    className="mb-2"
                  />
                  <Textarea
                    value={character.talents[index].description}
                    onChange={(e) => {
                      const newTalents = [...character.talents];
                      newTalents[index] = {
                        ...newTalents[index],
                        description: e.target.value,
                      };
                      setCharacter((prev) => ({
                        ...prev,
                        talents: newTalents,
                      }));
                    }}
                    placeholder="Talent description"
                    className="mb-2"
                  />
                </div>
              ))}
              <Label htmlFor="passive">Passive Ability</Label>
              <Input
                id="passive"
                value={character.passive.name}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    passive: { ...prev.passive, name: e.target.value },
                  }))
                }
                className="mb-2"
              />
              <Textarea
                value={character.passive.description}
                onChange={(e) =>
                  setCharacter((prev) => ({
                    ...prev,
                    passive: { ...prev.passive, description: e.target.value },
                  }))
                }
                placeholder="Passive ability description"
                className="mb-4"
              />
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !character.talents.every((t) => t.name && t.description) ||
                    !character.passive.name ||
                    !character.passive.description
                  }
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 7:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Step 7: Abilities</CardTitle>
              <CardDescription>
                Define your character's abilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="mb-4">
                  <Label htmlFor={`ability${index + 1}`}>
                    Ability {index + 1}
                  </Label>
                  <Input
                    id={`ability${index + 1}`}
                    value={character.abilities[index].name}
                    onChange={(e) => {
                      const newAbilities = [...character.abilities];
                      newAbilities[index] = {
                        ...newAbilities[index],
                        name: e.target.value,
                      };
                      setCharacter((prev) => ({
                        ...prev,
                        abilities: newAbilities,
                      }));
                    }}
                    className="mb-2"
                  />
                  <Textarea
                    value={character.abilities[index].description}
                    onChange={(e) => {
                      const newAbilities = [...character.abilities];
                      newAbilities[index] = {
                        ...newAbilities[index],
                        description: e.target.value,
                      };
                      setCharacter((prev) => ({
                        ...prev,
                        abilities: newAbilities,
                      }));
                    }}
                    placeholder="Ability description"
                    className="mb-2"
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <Button onClick={handlePrevStep}>Previous</Button>
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !character.abilities.every((a) => a.name && a.description)
                  }
                >
                  Finish
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 8:
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Character Sheet</CardTitle>
              <CardDescription>
                Review your completed character sheet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {character.name} ({character.stamina} Stamina,{" "}
                  {character.movement} Mov)
                </h2>
                <p>
                  <strong>
                    {character.type === "epithet" ? "Epithet" : "Core Word"}:
                  </strong>{" "}
                  {character.epithetOrCoreWord} ({character.proficiency})
                </p>
                <p>
                  <strong>Class:</strong> {character.class}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Weapon</h3>
                <p>
                  {character.weapon.name} - {character.weapon.description} Does{" "}
                  {character.weapon.damage} damage within{" "}
                  {character.weapon.range} range.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Talents</h3>
                {character.talents.map((talent, index) => (
                  <p key={index}>
                    <strong>{talent.name}</strong> - {talent.description}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold">Passive</h3>
                <p>
                  <strong>{character.passive.name}</strong> -{" "}
                  {character.passive.description}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Abilities</h3>
                {character.abilities.map((ability, index) => (
                  <p key={index}>
                    ● <strong>{ability.name}</strong> - {ability.description}
                  </p>
                ))}
              </div>
              <Button onClick={handlePrevStep}>Edit Character</Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-600 to-blue-500">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Anime Campaign Character Creator
      </h1>
      {renderStep()}
    </div>
  );
};

export default CharacterCreator;
