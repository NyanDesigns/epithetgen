// components/StepButtons.js
import { Button } from "@/components/ui/button";
import { FaDiceD20 } from "react-icons/fa";
import { TbEditCircle, TbSquareRoundedPlus2 } from "react-icons/tb";
import { VscDebugRestart } from "react-icons/vsc";

const StepButtons = ({
  step,
  onPrev,
  onNext,
  onReroll,
  onGenerate,
  onFinish,
  onEdit,
  onRestart,
  rerollsRemaining,
  isStepComplete, // New prop to check if the current step is complete
}) => {
  return (
    <div className="flex flex-row-reverse items-center justify-between w-full mt-8">
      {step < 7 && (
        <Button variant="nav" onClick={onNext} disabled={!isStepComplete}>
          Next
        </Button>
      )}
      {step === 7 && (
        <Button variant="nav" onClick={onFinish} disabled={!isStepComplete}>
          Finish
        </Button>
      )}
      {[2, 4].includes(step) && (
        <Button
          variant="generate"
          onClick={onReroll}
          disabled={rerollsRemaining === 0}
          className="flex flex-row gap-2"
        >
          <>
            <FaDiceD20 />
            Reroll ({rerollsRemaining})
          </>
        </Button>
      )}
      {[1, 5, 6, 7].includes(step) && (
        <Button
          variant="generate"
          onClick={onGenerate}
          className="flex flex-row gap-2"
        >
          <>
            <TbSquareRoundedPlus2 />
            Generate
          </>
        </Button>
      )}
      {step > 0 && step < 8 && (
        <Button
          variant="nav"
          onClick={onPrev}
          className={step === 1 ? "invisible" : ""}
        >
          Prev
        </Button>
      )}
      {step === 8 && (
        <>
          <Button
            variant="nav"
            onClick={onRestart}
            className="flex flex-row gap-2"
          >
            <>
              <VscDebugRestart />
              Restart
            </>
          </Button>
          <Button
            variant="nav"
            onClick={onEdit}
            className="flex flex-row gap-2"
          >
            <>
              <TbEditCircle />
              Edit
            </>
          </Button>
        </>
      )}
    </div>
  );
};

export default StepButtons;
