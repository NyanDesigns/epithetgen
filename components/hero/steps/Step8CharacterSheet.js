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
      <CardHeader className="text-foreground bg-gradient-to-r from-violet-400 to-rose-300">
        <CardTitle className="text-3xl font-bold">{character.name}</CardTitle>
        <CardDescription className="flex flex-row gap-2 text-lg text-foreground">
          {character.type === "epithet" ? "Epithet" : "Core Word"}:{" "}
          <div className="font-bold tracking-wide">
            {character.epithetOrCoreWord}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
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

        <Separator />
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
