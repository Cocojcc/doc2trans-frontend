"use client";

import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

const languages = [
	{ code: "en", label: "English", flag: "🇺🇸" },
	{ code: "zh", label: "中文", flag: "🇨🇳" },
	{ code: "ja", label: "日本語", flag: "🇯🇵" },
	{ code: "ko", label: "한국어", flag: "🇰🇷" },
	{ code: "fr", label: "Français", flag: "🇫🇷" },
	{ code: "de", label: "Deutsch", flag: "🇩🇪" },
	{ code: "es", label: "Español", flag: "🇪🇸" },
	{ code: "pt", label: "Português", flag: "🇧🇷" },
	{ code: "ru", label: "Русский", flag: "🇷🇺" },
	{ code: "ar", label: "العربية", flag: "🇸🇦" },
	{ code: "it", label: "Italiano", flag: "🇮🇹" },
];

interface LanguageSwitcherProps {
	currentLocale: string;
}

const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleLocaleChange = (newLocale: string) => {
		// Get path without locale prefix
		const segments = pathname.split("/");
		// Remove the first segment if it's a locale
		if (languages.some((l) => l.code === segments[1])) {
			segments.splice(1, 1);
		}
		// Build new path with new locale
		const newPath = `/${newLocale}${segments.join("/") || ""}`;
		router.push(newPath);
	};

	const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="gap-2 font-body"
				>
					<Globe className="w-4 h-4" />
					<span className="hidden md:inline">{currentLang.flag} {currentLang.label}</span>
					<span className="md:hidden">{currentLang.flag}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="border-2 border-foreground shadow-hard wobbly-border-sm max-h-80 overflow-y-auto scrollbar-none"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => handleLocaleChange(lang.code)}
						className={`font-body cursor-pointer ${currentLocale === lang.code ? "bg-muted" : ""
							}`}
					>
						<span className="mr-2">{lang.flag}</span>
						{lang.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSwitcher;
