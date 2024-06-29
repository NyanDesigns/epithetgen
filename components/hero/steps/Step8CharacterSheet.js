// components/steps/Step8CharacterSheet.js
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StepButtons from "../steps/card/StepButtons";

const Step8CharacterSheet = ({ character, handlePrevStep, handleRestart }) => {
  return (
    <Card className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg">
      <CardHeader className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
        <CardTitle className="text-3xl font-bold">{character.name}</CardTitle>
        <CardDescription className="text-lg text-white">
          {character.type === "epithet" ? "Epithet" : "Core Word"}:{" "}
          {character.epithetOrCoreWord}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Class:</strong> {character.class}
          </div>
          <div>
            <strong>Build:</strong> {character.build}
          </div>
          <div>
            <strong>Stamina:</strong> {character.stamina}
          </div>
          <div>
            <strong>Proficiency:</strong> {character.proficiency}
          </div>
          <div>
            <strong>Movement:</strong> {character.movement}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-xl font-semibold">Weapon</h3>
          <p className="font-medium">{character.weapon.name}</p>
          <p className="text-sm text-gray-600">
            {character.weapon.description}
          </p>
          <p className="text-sm">
            Damage: {character.weapon.damage} | Range: {character.weapon.range}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-xl font-semibold">Talents</h3>
          {character.talents
            .filter((talent) => talent.name)
            .map((talent, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{talent.name}</p>
                <p className="text-sm text-gray-600">{talent.description}</p>
              </div>
            ))}
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-xl font-semibold">Passive</h3>
          <p className="font-medium">{character.passive.name}</p>
          <p className="text-sm text-gray-600">
            {character.passive.description}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-xl font-semibold">Abilities</h3>
          {character.abilities
            .filter((ability) => ability.name)
            .map((ability, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{ability.name}</p>
                <p className="text-sm text-gray-600">{ability.description}</p>
              </div>
            ))}
        </div>

        <StepButtons
          step={8}
          onEdit={handlePrevStep}
          onRestart={handleRestart}
        />
      </CardContent>
    </Card>
  );
};

export default Step8CharacterSheet;
