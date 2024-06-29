// components/steps/Step5ClassAndWeapon.js

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
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import StepButtons from "../steps/card/StepButtons";

const Step5ClassAndWeapon = ({
  character,
  setCharacter,
  handleNextStep,
  handlePrevStep,
}) => {
  // Function to generate random content for all fields
  const generateContent = () => {
    // Generate a random class name using uniqueNamesGenerator
    const randomClass = uniqueNamesGenerator({
      dictionaries: [
        adjectives,
        [animals, colors][Math.floor(Math.random() * 2)],
      ],
      style: "capital",
      separator: " ",
    });

    // Generate a random weapon name using uniqueNamesGenerator
    const randomWeaponName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      style: "capital",
      separator: " ",
    });

    // Generate a random weapon description using random-words
    const randomDescription = generate({ exactly: 5, join: " " });

    // Generate random damage and range values
    const randomDamage = Math.floor(Math.random() * 10) + 1;
    const randomRange = Math.floor(Math.random() * 20) + 1;

    // Update the character state with the generated content
    setCharacter((prev) => ({
      ...prev,
      class: randomClass,
      weapon: {
        name: randomWeaponName,
        description: randomDescription,
        damage: randomDamage,
        range: randomRange,
      },
    }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Step 5: Class and Weapon</CardTitle>
        <CardDescription>
          Choose your character&apos;s class and define their weapon.
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
        <StepButtons
          step={5}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
          onGenerate={generateContent}
          isStepComplete={
            character.class !== "" && character.weapon.name !== ""
          }
        />
      </CardContent>
    </Card>
  );
};

export default Step5ClassAndWeapon;
