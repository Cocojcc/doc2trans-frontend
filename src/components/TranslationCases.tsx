import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cases = [
  {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=700&fit=crop",
    title: "商务合同翻译"
  },
  {
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=700&fit=crop",
    title: "学术论文翻译"
  },
  {
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=700&fit=crop",
    title: "产品手册翻译"
  },
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=700&fit=crop",
    title: "技术文档翻译"
  }
];

const TranslationCases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
          翻译案例
        </h2>
        <p className="font-body text-muted-foreground max-w-lg mx-auto">
          真实翻译效果，原文与译文对比展示
        </p>
      </div>
      
      <div className="relative">
        {/* 主图区域 */}
        <div className="bg-card border-2 border-foreground/20 p-4 wobbly-border overflow-hidden">
          <img 
            src={cases[currentIndex].image}
            alt={cases[currentIndex].title}
            className="w-full h-auto rounded"
          />
          <p className="font-body text-sm text-muted-foreground mt-3 text-center">
            {cases[currentIndex].title}
          </p>
        </div>

        {/* 左右切换按钮 */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card border-2 border-foreground/20 wobbly-border-sm flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="上一个案例"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card border-2 border-foreground/20 wobbly-border-sm flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="下一个案例"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-2 mt-4">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? "bg-primary" 
                : "bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`切换到案例 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TranslationCases;
