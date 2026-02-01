"use client";

import { FileType, Layout, Globe, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

const FeaturesSection = () => {
	const t = useTranslations("features");

	const features = [
		{
			icon: FileType,
			titleKey: "documentTranslation.title",
			descriptionKey: "documentTranslation.description",
			color: "bg-primary",
			rotation: "rotate-slight-left",
		},
		{
			icon: Layout,
			titleKey: "preserveLayout.title",
			descriptionKey: "preserveLayout.description",
			color: "bg-secondary",
			rotation: "rotate-slight-right",
		},
		{
			icon: Globe,
			titleKey: "multiLanguage.title",
			descriptionKey: "multiLanguage.description",
			color: "bg-accent",
			rotation: "rotate-slight-left",
		},
		{
			icon: BookOpen,
			titleKey: "glossary.title",
			descriptionKey: "glossary.description",
			color: "bg-primary",
			rotation: "rotate-slight-right",
		},
	];

	return (
		<section className="py-16 md:py-24 px-4 bg-muted/30">
			<div className="container max-w-6xl mx-auto">
				{/* Section heading */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 rotate-slight-right inline-block">
						{t("title")}
					</h2>
					<p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Features grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`group p-6 md:p-8 bg-background border-2 border-foreground shadow-hard wobbly-border hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${feature.rotation}`}
						>
							<div className="flex items-start gap-4">
								<div
									className={`flex-shrink-0 w-14 h-14 ${feature.color} border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center group-hover:animate-wiggle`}
								>
									<feature.icon className="w-7 h-7 text-primary-foreground" />
								</div>
								<div>
									<h3 className="font-heading text-xl md:text-2xl font-bold mb-2">
										{t(feature.titleKey)}
									</h3>
									<p className="font-body text-muted-foreground">
										{t(feature.descriptionKey)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
