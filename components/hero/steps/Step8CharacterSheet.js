// components/steps/Step8CharacterSheet.js
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import StepButtons from "../steps/card/StepButtons";

const Step8CharacterSheet = ({ character, handlePrevStep, handleRestart }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add content to PDF
    doc.setFontSize(20);
    doc.text(character.name, 20, 20);
    doc.setFontSize(16);
    doc.text(
      `${character.type === "epithet" ? "Epithet" : "Core Word"}: ${
        character.epithetOrCoreWord
      }`,
      20,
      30
    );

    // Basic Info
    doc.setFontSize(20);
    doc.text(character.name, 20, 20);
    doc.setFontSize(16);
    doc.text(
      `${character.type === "epithet" ? "Epithet" : "Core Word"}: ${
        character.epithetOrCoreWord
      }`,
      20,
      30
    );

    // Stats
    doc.setFontSize(12);
    doc.text(`Class: ${character.class}`, 20, 40);
    doc.text(`Build: ${character.build}`, 20, 50);
    doc.text(`Stamina: ${character.stamina}`, 20, 60);
    doc.text(`Proficiency: ${character.proficiency}`, 20, 70);
    doc.text(`Movement: ${character.movement}`, 20, 80);

    // Weapon
    doc.setFontSize(14);
    doc.text("Weapon", 20, 95);
    doc.setFontSize(12);
    doc.text(`Name: ${character.weapon.name}`, 25, 105);
    doc.text(`Description: ${character.weapon.description}`, 25, 115);
    doc.text(`Damage: ${character.weapon.damage}`, 25, 125);
    doc.text(`Range: ${character.weapon.range}`, 25, 135);

    // Talents
    doc.setFontSize(14);
    doc.text("Talents", 20, 150);
    doc.setFontSize(12);
    character.talents
      .filter((talent) => talent.name)
      .forEach((talent, index) => {
        doc.text(`${talent.name}: ${talent.description}`, 25, 160 + index * 10);
      });

    // Passive
    doc.setFontSize(14);
    doc.text("Passive", 20, 220);
    doc.setFontSize(12);
    doc.text(
      `${character.passive.name}: ${character.passive.description}`,
      25,
      230
    );

    // Abilities
    doc.setFontSize(14);
    doc.text("Abilities", 20, 250);
    doc.setFontSize(12);
    character.abilities
      .filter((ability) => ability.name)
      .forEach((ability, index) => {
        doc.text(
          `${ability.name}: ${ability.description}`,
          25,
          260 + index * 10
        );
      });

    // Save the PDF
    doc.save(`${character.name}_character_sheet.pdf`);
  };
  return (
    <Card className="w-full max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg">
      <CardHeader className="text-foreground bg-gradient-to-r from-violet-400 to-rose-300">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">{character.name}</CardTitle>
          <Button
            onClick={handleDownloadPDF}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            Download as
            <FaFilePdf />
          </Button>
        </div>
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
