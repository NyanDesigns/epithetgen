// components/steps/Step6TalentsAndPassive.js
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
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";
import StepButtons from "../steps/card/StepButtons";

const Step6TalentsAndPassive = ({
  character,
  setCharacter,
  handleNextStep,
  handlePrevStep,
}) => {
  // State to keep track of visible talents
  const [visibleTalents, setVisibleTalents] = useState(1);

  // Effect to set initial visible talents based on filled out talents
  useEffect(() => {
    const filledTalents = character.talents.filter(
      (t) => t.name || t.description
    );
    setVisibleTalents(filledTalents.length || 1);
  }, []);

  // Function to generate random content for talents and passive
  const generateContent = () => {
    const config = {
      dictionaries: [adjectives, names],
      style: "capital",
      separator: " ",
    };

    // Generate random talents
    const newTalents = Array(visibleTalents)
      .fill()
      .map(() => ({
        name: uniqueNamesGenerator(config),
        description: generate({ exactly: 5, join: " " }),
      }));

    // Generate random passive
    const newPassive = {
      name: uniqueNamesGenerator(config),
      description: generate({ exactly: 7, join: " " }),
    };

    // Update character state
    setCharacter((prev) => ({
      ...prev,
      talents: newTalents,
      passive: newPassive,
    }));
  };

  // Function to add a new talent
  const addTalent = () => {
    if (visibleTalents < 5) {
      setVisibleTalents((prev) => prev + 1);
      setCharacter((prev) => ({
        ...prev,
        talents: [...prev.talents, { name: "", description: "" }],
      }));
    }
  };

  // Function to remove a talent
  const removeTalent = (index) => {
    setVisibleTalents((prev) => prev - 1);
    setCharacter((prev) => ({
      ...prev,
      talents: prev.talents.filter((_, i) => i !== index),
    }));
  };

  // Check if the step is complete
  const isStepComplete =
    character.talents
      .slice(0, visibleTalents)
      .every((t) => t.name && t.description) &&
    character.passive.name &&
    character.passive.description;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Step 6: Talents & Passive</CardTitle>
        <CardDescription>
          Define your character's talents and passive ability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Render visible talents */}
        {character.talents.slice(0, visibleTalents).map((talent, index) => (
          <div key={index} className="mb-4">
            <Label htmlFor={`talent${index + 1}`}>Talent {index + 1}</Label>
            <Input
              id={`talent${index + 1}`}
              value={talent.name}
              onChange={(e) => {
                const newTalents = [...character.talents];
                newTalents[index] = {
                  ...newTalents[index],
                  name: e.target.value,
                };
                setCharacter((prev) => ({ ...prev, talents: newTalents }));
              }}
              className="mb-2"
            />
            <Textarea
              value={talent.description}
              onChange={(e) => {
                const newTalents = [...character.talents];
                newTalents[index] = {
                  ...newTalents[index],
                  description: e.target.value,
                };
                setCharacter((prev) => ({ ...prev, talents: newTalents }));
              }}
              placeholder="Talent description"
              className="mb-2"
            />
            {/* Delete button for each talent */}
            {visibleTalents > 1 && (
              <Button
                onClick={() => removeTalent(index)}
                variant="destructive"
                size="sm"
              >
                Delete Talent
              </Button>
            )}
          </div>
        ))}

        {/* Add talent button */}
        {visibleTalents < 5 && (
          <Button onClick={addTalent} className="mb-4">
            + Add Talent
          </Button>
        )}

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

        {/* Updated StepButtons component */}
        <StepButtons
          step={6}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          onGenerate={generateContent}
          isStepComplete={isStepComplete}
        />
      </CardContent>
    </Card>
  );
};

export default Step6TalentsAndPassive;
