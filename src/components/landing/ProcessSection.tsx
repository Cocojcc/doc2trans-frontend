"use client";

import { MessageCircle, FileUp, Sparkles, Download } from "lucide-react";
import { useTranslations } from "next-intl";

const ProcessSection = () => {
	const t = useTranslations("process");

	const steps = [
		{
			icon: MessageCircle,
			titleKey: "step1.title",
			descriptionKey: "step1.description",
		},
		{
			icon: FileUp,
			titleKey: "step2.title",
			descriptionKey: "step2.description",
		},
		{
			icon: Sparkles,
			titleKey: "step3.title",
			descriptionKey: "step3.description",
		},
		{
			icon: Download,
			titleKey: "step4.title",
			descriptionKey: "step4.description",
		},
	];

	return (
		<section className="py-16 md:py-24 px-4">
			<div className="container max-w-5xl mx-auto">
				{/* Section heading */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 rotate-slight-left inline-block">
						{t("title")}
					</h2>
					<p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Steps */}
				<div className="relative">
					{/* Connecting line for desktop */}
					<div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-1 bg-foreground/20 -z-10" />

					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{steps.map((step, index) => (
							<div key={index} className="text-center group">
								{/* Step number and icon container */}
								<div className="relative inline-block mb-4">
									{/* Step number */}
									<div className="absolute -top-2 -left-2 w-8 h-8 bg-primary border-2 border-foreground wobbly-border-sm flex items-center justify-center z-10">
										<span className="font-heading font-bold text-primary-foreground">{index + 1}</span>
									</div>
									{/* Icon box */}
									<div className="w-20 h-20 bg-background border-2 border-foreground shadow-hard wobbly-border flex items-center justify-center group-hover:bg-muted transition-colors">
										<step.icon className="w-10 h-10 text-foreground" />
									</div>
								</div>

								<h3 className="font-heading text-xl font-bold mb-2">{t(step.titleKey)}</h3>
								<p className="font-body text-muted-foreground text-sm">{t(step.descriptionKey)}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProcessSection;
