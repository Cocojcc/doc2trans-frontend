"use client";

import { useState } from "react";
import Header from "@/components/Header";
import UploadArea from "@/components/UploadArea";
import TrustStrip from "@/components/TrustStrip";
import TranslationOptions from "@/components/TranslationOptions";
import TranslateButton from "@/components/TranslateButton";
import TranslationProgress from "@/components/TranslationProgress";
import ResultComparison from "@/components/ResultComparison";
import { toast } from "@/hooks/use-toast";

interface UploadedFile {
	name: string;
	size: number;
	type: string;
}

type TranslationState = "idle" | "translating" | "complete";

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [file, setFile] = useState<UploadedFile | null>(null);
	const [targetLanguage, setTargetLanguage] = useState("es");
	const [translationStyle, setTranslationStyle] = useState("standard");
	const [glossaryFile, setGlossaryFile] = useState<File | null>(null);
	const [translationState, setTranslationState] = useState<TranslationState>("idle");
	const [currentStage, setCurrentStage] = useState(0);

	// Mock content for demo
	const originalContent = {
		title: "Project Summary Report",
		paragraphs: [
			"This quarterly report outlines the major achievements and milestones reached by our development team during Q4 2024.",
			"Key highlights include the successful launch of our mobile application, which has already garnered over 50,000 downloads.",
			"Our customer satisfaction scores improved by 23% compared to the previous quarter, reflecting our commitment to quality.",
		],
	};

	const translatedContent = {
		title: "Informe Resumen del Proyecto",
		paragraphs: [
			"Este informe trimestral describe los principales logros e hitos alcanzados por nuestro equipo de desarrollo durante el cuarto trimestre de 2024.",
			"Los aspectos más destacados incluyen el exitoso lanzamiento de nuestra aplicación móvil, que ya ha conseguido más de 50.000 descargas.",
			"Nuestras puntuaciones de satisfacción del cliente mejoraron un 23% en comparación con el trimestre anterior, lo que refleja nuestro compromiso con la calidad.",
		],
	};

	const handleFileUpload = (uploadedFile: UploadedFile) => {
		setFile(uploadedFile);
		setTranslationState("idle");
		toast({
			title: "📄 File uploaded!",
			description: `${uploadedFile.name} is ready for translation.`,
		});
	};

	const handleFileRemove = () => {
		setFile(null);
		setTranslationState("idle");
		setCurrentStage(0);
	};

	const handleTranslate = () => {
		if (!file || !targetLanguage) return;

		setTranslationState("translating");
		setCurrentStage(0);

		// Simulate translation stages
		const stageInterval = setInterval(() => {
			setCurrentStage((prev) => {
				if (prev >= 2) {
					clearInterval(stageInterval);
					setTimeout(() => {
						setTranslationState("complete");
						toast({
							title: "✨ Translation complete!",
							description: "Your document has been translated successfully.",
						});
					}, 500);
					return prev;
				}
				return prev + 1;
			});
		}, 1500);
	};

	const handleDownload = () => {
		toast({
			title: "⬇️ Downloading...",
			description: "Your translated document is being prepared.",
		});
	};

	const handleRetranslate = () => {
		setTranslationState("idle");
		setCurrentStage(0);
	};

	const handleSave = () => {
		toast({
			title: "💾 Saved!",
			description: "Translation added to your history.",
		});
	};

	const handleLoginClick = () => {
		setIsLoggedIn(true);
		toast({
			title: "👋 Welcome back!",
			description: "You're now signed in.",
		});
	};

	const handleHistoryClick = () => {
		toast({
			title: "📚 History",
			description: "Translation history feature coming soon!",
		});
	};

	const isTranslateDisabled = !file || !targetLanguage;

	return (
		<div className="min-h-screen flex flex-col">
			<Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} onHistoryClick={handleHistoryClick} />

			<main className="flex-1 container py-8 md:py-12 px-4">
				{/* Hero section */}
				<div className="text-center mb-8">
					<h2 className="font-heading text-3xl md:text-5xl font-bold mb-3 rotate-slight-left inline-block">
						Translate documents, <span className="text-primary hand-underline">keep layout</span>
					</h2>
				</div>

				{/* Upload area */}
				<UploadArea file={file} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} />

				{/* Translation options - always show when idle */}
				{translationState === "idle" && (
					<>
						<TranslationOptions
							targetLanguage={targetLanguage}
							onTargetChange={setTargetLanguage}
							selectedStyle={translationStyle}
							onStyleChange={setTranslationStyle}
							glossaryFile={glossaryFile}
							onGlossaryUpload={setGlossaryFile}
						/>

						<TranslateButton isDisabled={isTranslateDisabled} isTranslating={false} onClick={handleTranslate} />
					</>
				)}

				{/* Trust strip - only show when no file */}
				{!file && <TrustStrip />}

				{/* Translation progress */}
				{translationState === "translating" && <TranslationProgress currentStage={currentStage} isComplete={false} />}

				{/* Translation results */}
				{translationState === "complete" && (
					<ResultComparison
						originalContent={originalContent}
						translatedContent={translatedContent}
						isLoggedIn={isLoggedIn}
						onDownload={handleDownload}
						onRetranslate={handleRetranslate}
						onSave={handleSave}
						onLoginPrompt={handleLoginClick}
					/>
				)}
			</main>

			{/* Footer */}
			<footer className="border-t-2 border-foreground py-6 px-4">
				<div className="container text-center">
					<p className="font-body text-muted-foreground">Made with ❤️ for people who hate reformatting documents</p>
				</div>
			</footer>
		</div>
	);
}
