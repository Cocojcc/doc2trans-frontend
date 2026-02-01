export const locales = ["en", "zh", "ja", "ko", "fr", "de", "es", "pt", "ru", "ar", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string | undefined): locale is Locale {
	return locales.includes(locale as Locale);
}
