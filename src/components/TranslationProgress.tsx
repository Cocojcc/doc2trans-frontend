import { FileSearch, Languages, Layout, CheckCircle } from "lucide-react";

interface TranslationProgressProps {
  currentStage: number;
  isComplete: boolean;
}

const stages = [
  { icon: FileSearch, label: "Parsing document...", description: "Reading your file structure" },
  { icon: Languages, label: "Translating content...", description: "Converting text carefully" },
  { icon: Layout, label: "Restoring layout...", description: "Putting everything back in place" },
];

const TranslationProgress = ({ currentStage, isComplete }: TranslationProgressProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-card border-2 border-foreground shadow-hard wobbly-border p-6">
        <h3 className="font-heading text-xl mb-6 text-center">
          {isComplete ? "✨ Translation Complete!" : "Working on your document..."}
        </h3>

        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = currentStage === index;
            const isCompleted = currentStage > index || isComplete;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 border-2 wobbly-border-sm transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : isCompleted
                    ? "border-foreground/30 bg-muted"
                    : "border-foreground/20 bg-transparent"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center border-2 wobbly-border-sm ${
                    isCompleted
                      ? "bg-green-500 border-foreground"
                      : isActive
                      ? "bg-primary border-foreground animate-pulse"
                      : "bg-muted border-foreground/30"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p
                    className={`font-heading text-lg ${
                      isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hand-drawn progress bar */}
        <div className="mt-6 h-4 bg-muted border-2 border-foreground wobbly-border-sm overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: isComplete ? "100%" : `${((currentStage + 1) / stages.length) * 100}%`,
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TranslationProgress;
