import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/insights";
import { getTranslations } from "next-intl/server";
import { Calendar, ArrowRight, Tag } from "lucide-react";

interface InsightsIndexProps {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: InsightsIndexProps): Promise<Metadata> {
	const t = await getTranslations("insights");
	return {
		title: `${t("title")} - Doc2Trans`,
		description: t("metaDescription"),
	};
}

export default async function InsightsIndex({ params }: InsightsIndexProps) {
	const { locale } = await params;
	const t = await getTranslations("insights");
	const posts = getAllPosts(locale);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header - reuse from main page */}
			<header className="w-full py-4 px-6 flex items-center justify-between border-b-2 border-foreground bg-background/80 backdrop-blur-sm sticky top-0 z-50">
				<Link href={`/${locale}`} className="flex items-center gap-3 rotate-slight-left hover:rotate-0 transition-transform">
					<div className="w-10 h-10 bg-primary border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center">
						<span className="text-primary-foreground font-bold">D</span>
					</div>
					<h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">Doc2Trans</h1>
				</Link>
				<Link
					href={`/${locale}`}
					className="font-body text-foreground hover:text-primary transition-colors"
				>
					{t("backToHome")}
				</Link>
			</header>

			<main className="flex-1 container py-12 px-4">
				{/* Page header */}
				<div className="text-center mb-12">
					<h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 rotate-slight-left inline-block">
						{t("title")}
					</h1>
					<p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Posts list */}
				{posts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/${locale}/insights/${post.slug}`}
								className="group block p-8 bg-background border-2 border-foreground shadow-hard wobbly-border hover:shadow-hard-hover hover:translate-x-[1px] hover:translate-y-[1px] transition-all h-full"
							>
								<div className="flex flex-col h-full">
									{/* Date */}
									<div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-4">
										<Calendar className="w-4 h-4" />
										<span>{post.date}</span>
									</div>

									{/* Title */}
									<h2 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
										{post.title}
									</h2>

									{/* Description */}
									<p className="font-body text-muted-foreground mb-6 line-clamp-3 flex-1">
										{post.description}
									</p>

									{/* Tags */}
									{post.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mb-6">
											{post.tags.slice(0, 3).map((tag) => (
												<span
													key={tag}
													className="inline-flex items-center gap-1 px-2 py-1 text-xs font-body bg-muted border border-foreground wobbly-border-sm"
												>
													<Tag className="w-3 h-3" />
													{tag}
												</span>
											))}
										</div>
									)}

									{/* Read more */}
									<div className="mt-auto">
										<span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all font-body text-sm">
											{t("readMore")}
											<ArrowRight className="w-4 h-4" />
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<p className="font-body text-muted-foreground">{t("noPosts")}</p>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="border-t-2 border-foreground py-6 px-4">
				<div className="container text-center">
					<p className="font-body text-sm text-muted-foreground">
						© {new Date().getFullYear()} Doc2Trans. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
