"use client";

import { FileText, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const HeroSection = () => {
	const t = useTranslations("hero");

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className="relative py-16 md:py-24 px-4 overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 wobbly-border rotate-12 -z-10" />
			<div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 wobbly-border-alt -rotate-12 -z-10" />
			<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 wobbly-border rotate-45 -z-10" />

			<div className="container max-w-4xl mx-auto text-center">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<div className="w-24 h-24 bg-primary border-4 border-foreground shadow-hard wobbly-border flex items-center justify-center rotate-slight-left hover:rotate-slight-right transition-transform duration-300">
						<FileText className="w-12 h-12 text-primary-foreground" />
					</div>
				</div>

				{/* Main heading */}
				<h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 rotate-slight-left inline-block">
					{t("title")}
					<span className="text-primary hand-underline">{t("titleHighlight")}</span>
				</h1>

				{/* Subtitle */}
				<p className="font-body text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					{t("subtitle")}
				</p>

				{/* CTA Button */}
				<Button
					onClick={scrollToContact}
					size="lg"
					className="font-heading text-lg px-8 py-6 border-2 border-foreground shadow-hard wobbly-border-sm hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
				>
					{t("cta")}
					<ArrowDown className="ml-2 w-5 h-5 group-hover:animate-bounce" />
				</Button>
			</div>
		</section>
	);
};

export default HeroSection;
