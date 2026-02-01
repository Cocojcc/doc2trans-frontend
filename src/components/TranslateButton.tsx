import { Wand2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface TranslateButtonProps {
  isDisabled: boolean;
  isTranslating: boolean;
  onClick: () => void;
}

const TranslateButton = ({ isDisabled, isTranslating, onClick }: TranslateButtonProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 flex justify-center">
      <Button
        size="lg"
        disabled={isDisabled || isTranslating}
        onClick={onClick}
        className="min-w-[200px] text-xl"
      >
        {isTranslating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Translating...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-6 h-6" />
            <span>Translate!</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default TranslateButton;
