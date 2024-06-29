// components/steps/Step7Abilities.js
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
import { Textarea } from "@/components/ui/textarea";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import StepButtons from "../steps/card/StepButtons";

const Step7Abilities = ({
  character,
  setCharacter,
  handleNextStep,
  handlePrevStep,
}) => {
  // State to keep track of visible abilities
  const [visibleAbilities, setVisibleAbilities] = useState(1);

  // Effect to set initial visible abilities based on filled out abilities
  useEffect(() => {
    const filledAbilities = character.abilities.filter(
      (a) => a.name || a.description
    );
    setVisibleAbilities(filledAbilities.length || 1);
  }, []);

  // Function to generate random content for abilities
  const generateContent = () => {
    const config = {
      dictionaries: [adjectives, animals],
      style: "capital",
      separator: " ",
    };

    // Generate random abilities
    const newAbilities = Array(visibleAbilities)
      .fill()
      .map(() => ({
        name: uniqueNamesGenerator(config),
        description: generate({ exactly: 8, join: " " }),
        cost: Math.random() < 0.7 ? 1 : 3, // 70% chance of cost 1, 30% chance of cost 3
      }));

    // Update character state
    setCharacter((prev) => ({
      ...prev,
      abilities: newAbilities,
    }));
  };

  // Function to add a new ability
  const addAbility = () => {
    if (visibleAbilities < 5) {
      setVisibleAbilities((prev) => prev + 1);
      setCharacter((prev) => ({
        ...prev,
        abilities: [...prev.abilities, { name: "", description: "", cost: 1 }],
      }));
    }
  };

  // Function to remove an ability
  const removeAbility = (index) => {
    setVisibleAbilities((prev) => prev - 1);
    setCharacter((prev) => ({
      ...prev,
      abilities: prev.abilities.filter((_, i) => i !== index),
    }));
  };

  // Check if the step is complete
  const isStepComplete = character.abilities
    .slice(0, visibleAbilities)
    .every((a) => a.name && a.description);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Step 7: Abilities</CardTitle>
        <CardDescription>Define your character's abilities.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Render visible abilities */}
        {character.abilities
          .slice(0, visibleAbilities)
          .map((ability, index) => (
            <div key={index} className="mb-4">
              <Label htmlFor={`ability${index + 1}`}>Ability {index + 1}</Label>
              <Input
                id={`ability${index + 1}`}
                value={ability.name}
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
                value={ability.description}
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
              <Label htmlFor={`abilityCost${index + 1}`}>Cost</Label>
              <Input
                id={`abilityCost${index + 1}`}
                type="number"
                value={ability.cost}
                onChange={(e) => {
                  const newAbilities = [...character.abilities];
                  newAbilities[index] = {
                    ...newAbilities[index],
                    cost: parseInt(e.target.value),
                  };
                  setCharacter((prev) => ({
                    ...prev,
                    abilities: newAbilities,
                  }));
                }}
                className="mb-2"
              />
              {/* Delete button for each ability */}
              {visibleAbilities > 1 && (
                <Button
                  onClick={() => removeAbility(index)}
                  variant="destructive"
                  size="sm"
                >
                  Delete Ability
                </Button>
              )}
            </div>
          ))}

        {/* Add ability button */}
        {visibleAbilities < 5 && (
          <Button onClick={addAbility} className="mb-4">
            + Add Ability
          </Button>
        )}

        {/* Updated StepButtons component */}
        <StepButtons
          step={7}
          onPrev={handlePrevStep}
          onFinish={handleNextStep}
          onGenerate={generateContent}
          isStepComplete={isStepComplete}
        />
      </CardContent>
    </Card>
  );
};

export default Step7Abilities;
