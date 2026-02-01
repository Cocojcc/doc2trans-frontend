import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
	title: "Doc2Trans - Document Translation Service",
	description: "Professional document translation service. Supports Word/PDF formats. Perfectly preserves original layout and styles.",
};

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = await params;

	// Validate locale
	if (!routing.locales.includes(locale as typeof routing.locales[number])) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className="antialiased">
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
