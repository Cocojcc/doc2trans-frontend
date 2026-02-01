import Header from "@/components/Header";
import { HeroSection, FeaturesSection, ProcessSection, ContactSection, InsightsPreview } from "@/components/landing";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/insights";

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
	const { locale } = await params;
	const t = await getTranslations("footer");
	const posts = getAllPosts(locale);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-1">
				<HeroSection />
				<FeaturesSection />
				<ProcessSection />
				<InsightsPreview posts={posts} locale={locale} />
				<ContactSection />
			</main>

			{/* Footer */}
			<footer className="border-t-2 border-foreground py-6 px-4">
				<div className="container text-center">
					<p className="font-body text-muted-foreground">
						{t("tagline")}
					</p>
					<p className="font-body text-sm text-muted-foreground mt-2">
						{t("copyright", { year: new Date().getFullYear() })}
					</p>
				</div>
			</footer>
		</div>
	);
}
