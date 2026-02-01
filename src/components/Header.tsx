"use client";

import { FileText } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
	const t = useTranslations("header");
	const locale = useLocale();

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<header className="w-full py-4 px-6 flex items-center justify-between border-b-2 border-foreground bg-background/80 backdrop-blur-sm sticky top-0 z-50">
			<div className="flex items-center gap-3 rotate-slight-left">
				<div className="w-10 h-10 bg-primary border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center">
					<FileText className="w-5 h-5 text-primary-foreground" />
				</div>
				<h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">Doc2Trans</h1>
			</div>

			<nav className="flex items-center gap-2 md:gap-4">
				<LanguageSwitcher currentLocale={locale} />
				<button
					onClick={scrollToContact}
					className="font-body text-foreground hover:text-primary transition-colors"
				>
					{t("contact")}
				</button>
			</nav>
		</header>
	);
};

export default Header;
